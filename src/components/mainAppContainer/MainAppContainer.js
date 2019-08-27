import React from 'react';
import TextPlaceHolder from '../textPlaceHolder/TextPlaceHolder';
import StepperHorizontal from '../stepperHorizontal/StepperHorizontal';
import RegisterForm from '../forms/registerForm/RegisterForm';
import SecurityForm from '../forms/securityForm/SecurityForm';
import TemplateCard from '../templateCard/TemplateCard';
import ProfileForm from '../forms/profileForm/ProfileForm';
import ThankYou from '../forms/thankYou/ThankYou'
import Countries from '../forms/common/Countries.json';
import localforage from 'localforage';
import validate from '../forms/common/validate/Validate';
import axios from 'axios';

class MainAppContainer extends React.Component {

    state = {
        steps: [
        { title: "Register" },
        { title: "Security code" },
        { title: "User profile" },
        { title: "Thank you" }
      ],
     activeStep: 1,
     formData: {
        email: {
          value: "",
          validationRules: {
            required: true,
            isEmail: true
          },
          touched: false,
          valid: false,
          type: "email",
          element: "input",
          placeholder: "Enter your email",
          name: "email",
          errorMessage: ""
        },
        intlPhoneInput: {
          value: "",
          validationRules: {
            required: true,
            isPhoneNumber: true
          },
          inputPhoneVal: "",
          valid: false,
          placeholder: "",
          touched: false,
          element: "intlPhoneInput",
          name: "phone",
          defaultCountry: "ch",
          errorMessage: ""
        },
        category: {
          element: "select",
          options: [
            { name: "Frontend", value: "frontend" },
            { name: "Accountant", value: "accountant" },
            { name: "Sales", value: "sales" },
            { name: "Manager", value: "manager" }
          ],
          value: "",
          validationRules: {
            required: true
          },
          valid: false,
          name: "category",
          touched: false,
          placeholder: "Select your category",
          errorMessage: ""
        },
        password: {
          element: "input",
          type: "password",
          value: "",
          showPassword: false,
          valid: false,
          validationRules: {
            required: true
          },
          name: "password",
          placeholder: "Enter your password",
          touched: false,
          errorMessage: ""
        },
        agreement: {
          element: "checkbox",
          isChecked: false,
          value: "",
          valid: false,
          validationRules: {
           // isChecked:false,
            required: true
          },
          touched: false,
          name: "agreement",
          labelText: "Agree with terms and conditions",
          errorMessage: ""
        },
        securityCode: {
          element: "input",
          type: "text",
          value: "",
          validationRules: {
            required: true
          },
          valid: false,
          touched: false,
          name: "code",
          placeholder: "Enter security code",
          errorMessage: ""
        },
        name: {
          element: "input",
          type: "text",
          value: "",
          valid: false,
          validationRules: {
            required: true
          },
          touched: false,
          placeholder: "Enter your name",
          name: "name",
          errorMessage: ""
        },
        website: {
          element: "input",
          type: "text",
          value: "",
          valid: false,
          validationRules: {
            required: true,
            isDomain: true
          },
          touched: false,
          placeholder: "https://google.com",
          name: "website",
          errorMessage: ""
        },
        country: {
          element: "select",
          name: "country",
          value: "",
          options: [...Countries],
          placeholder: "Select your country",
          valid: false,
          validationRules: {
            required: true
          },
          touched: false,
          errorMessage: ""
        },
        avatar: {
          value: "",
          valid: true,
          validationRules: {
            required: false
          },
          touched: false,
          errorMessage: ""
        }
    }
    };

    componentDidMount() {
      localforage
        .setDriver([
          localforage.INDEXEDDB,
          localforage.WEBSQL,
          localforage.LOCALSTORAGE
        ])
        .then(() => {
          this.rehydrateState();
        });
    }
  
    rehydrateState = () => {
      const { formData } = this.state;
      let newFormData = { ...formData };
      let { activeStep } = this.state;
      localforage
        .iterate((value, key) => {
          if (key === "activeStep") {
            activeStep = value;
          } else if (key === "intlPhoneInput") {
            newFormData = {
              ...newFormData,
              [key]: {
                ...newFormData[key],
                inputPhoneVal: value[1],
                value: value[0],
                defaultCountry: value[2],
                touched: true,
                valid: validate(value[1], newFormData[key].validationRules)
              }
            };
          } else {
            newFormData = {
              ...newFormData,
              [key]: {
                ...newFormData[key],
                value: value,
                touched: true,
                valid: validate(value, newFormData[key].validationRules)
              }
            };
          }
        })
        .then(() => {
          this.setState({ activeStep: activeStep, formData: { ...newFormData } });
        });
    };
  
    mapServerSubmissionErrs = errorsArray => {
      let { formData } = this.state;
      for (let item in errorsArray) {
        let key = item !== "mobile" ? item : "intlPhoneInput";
        formData = {
          ...formData,
          [key]: {
            ...formData[key],
            errorMessage: errorsArray[item][0],
            touched: true,
            valid: false
          }
        };
      }
  
      this.setState({ formData, activeStep: 1 });
    };
  
    setErrors = submittedData => {
      let valid = true;
      let stateUpdateObject = { ...this.state.formData };
      let formStateChanged = false;
      for (let data in submittedData) {
        valid = valid && submittedData[data].valid;
        if (!submittedData[data].valid) {
          formStateChanged = true;
          stateUpdateObject = {
            ...stateUpdateObject,
            [data]: {
              ...this.state.formData[data],
              valid: false,
              touched: true
            }
          };
        }
      }
      if (formStateChanged) {
        this.setState({ formData: { ...stateUpdateObject } });
      }
      return valid;
    };
  
    validFormSubmission = formType => {
      const { formData } = this.state;
      let submittedData = {};
      switch (formType) {
        case "register":
          submittedData = {
            email: formData.email,
            intlPhoneInput: formData.intlPhoneInput,
            category: formData.category,
            password: formData.password
          };
          return this.setErrors(submittedData);
  
        case "securitycode":
          submittedData = { securityCode: formData.securityCode };
          return this.setErrors(submittedData);
  
        case "userprofile":
          submittedData = {
            name: formData.name,
            website: formData.website,
            country: formData.country,
            avatar: formData.avatar
          };
          return this.setErrors(submittedData);
        default:
          return null;
      }
    };
  
    goToNextStep = () => {
      const { activeStep } = this.state;
      activeStep === 1
        ? this.setState(
            prevState => {
              return {
                ...prevState,
                activeStep: prevState.activeStep + 1,
                formData: {
                  ...prevState.formData,
                  agreement: { ...prevState.formData.agreement, isChecked: false }
                }
              };
            },
            () => {
              this.setActiveStepInStorage(this.state.activeStep);
            }
          )
        : this.setState(
            prevState => {
              return {
                ...prevState,
                activeStep: prevState.activeStep + 1
              };
            },
            () => {
              this.setActiveStepInStorage(this.state.activeStep);
            }
          );
    };
  
    goToPrevStep = () => {
      this.setState(
        prevState => {
          return {
            ...prevState,
            activeStep: prevState.activeStep - 1
          };
        },
        () => {
          this.setActiveStepInStorage(this.state.activeStep);
        }
      );
    };
  
    goToStep = step => {
      this.setState(
        prevState => {
          return {
            ...prevState,
            activeStep: step
          };
        },
        () => {
          this.setActiveStepInStorage(this.state.activeStep);
        }
      );
    };
  
    setActiveStepInStorage = activeStep => {
      localforage.setItem("activeStep", activeStep);
    };
  
    handleFooterBtnClick = formType => {
      const { activeStep } = this.state;
     // console.log(activeStep);
      if (this.validFormSubmission(formType)) {
        if (activeStep === 3) {
          let data = this.handleDataToSubmit();
          
          axios
            .post(
              "http://localhost:5000/user",
              {
               ...data
              },
              
              
            )
            .then(res => {
              console.log(res);
              localforage.removeItem("password", () => {
                localforage.removeItem("securityCode");
              });
              this.goToNextStep();
              
            })
            .catch(err => {
              console.log(err.response.data.message);
              this.mapServerSubmissionErrs(err.response.data.message);
            });
        } else {
          this.goToNextStep();
        }
      }
    };
  
    handleDataToSubmit = () => {
      const { formData } = this.state;
      let dataToSubmit = {};
      for (let control in formData) {
        if (control === "intlPhoneInput") {
          dataToSubmit = { ...dataToSubmit, mobile: formData[control].value };
        } else {
          dataToSubmit = {
            ...dataToSubmit,
            [control.toLowerCase()]: formData[control].value
          };
        }
      }
      delete dataToSubmit.agreement;
      return dataToSubmit;
    };
  
    updateStateAfterChange = (
      e,
      id,
      phoneNumber = null,
      defaultCountry = null
    ) => {
      let valueForLocalForage = e.target.value;
      let phoneNumberForLocalForage = phoneNumber;
      let defaultCountryForLocalForage = defaultCountry;
      this.setState(
        {
          formData: {
            ...this.state.formData,
            [id]: {
              ...this.state.formData[id],
              value: phoneNumber ? phoneNumber : e.target.value,
              inputPhoneVal: phoneNumber ? e.target.value : undefined,
              defaultCountry: defaultCountry ? defaultCountry : undefined,
              touched: true,
              valid: validate(
                e.target.value,
                this.state.formData[id].validationRules
              )
            }
          }
        },
        () => {
          if (id === "intlPhoneInput") {
            localforage.setItem(id, [
              phoneNumberForLocalForage,
              valueForLocalForage,
              defaultCountryForLocalForage
            ]);
          } else {
            localforage
              .setItem(id, valueForLocalForage)
              .catch(err => console.log(err));
          }
        }
      );
    };
  
    handleChange = (e, id, phoneObj = {}) => {
      if (id === "intlPhoneInput") {
        let { countryData, value } = phoneObj;
        let defaultCountry = countryData.iso2;
        let phoneNumber = `+${countryData.dialCode}-${value}`;
        //faking the event object to use the same function
        this.updateStateAfterChange(
          { target: { value: value } },
          id,
          phoneNumber,
          defaultCountry
        );
      } else if (id === "agreement") {
        this.setState(prevState => {
          const isChecked = prevState.formData.agreement.isChecked;
          return {
            formData: {
              ...prevState.formData,
              agreement: {
                ...prevState.formData.agreement,
                isChecked: !isChecked,
                value: !isChecked ? "agreed" : "",
                valid: validate(
                  !isChecked ? "agreed" : "",
                  this.state.formData.agreement.validationRules
                ),
                touched: true
              }
            }
          };
        });
      } else {
        this.updateStateAfterChange(e, id);
      }
    };
  
    handleAvatarChange = avatarURL => {
      this.setState(
        {
          formData: {
            ...this.state.formData,
            avatar: {
              ...this.state.formData.avatar,
              value: avatarURL,
              valid: validate(
                avatarURL,
                this.state.formData.avatar.validationRules
              ),
              touched: true
            }
          }
        },
        () => {
          localforage.setItem("avatar", avatarURL).catch(err => console.log(err));
        }
      );
    };
  
    handleShowPasswordClick = () => {
      this.setState(prevState => {
        const showPassword = prevState.formData.password.showPassword;
        return {
          formData: {
            ...prevState.formData,
            password: {
              ...prevState.formData.password,
              showPassword: !showPassword
            }
          }
        };
      });
    };

    displayStepForm = () => {
        const { activeStep, formData } = this.state;
        switch (activeStep) {
          case 1:
            return (
                <>
              <RegisterForm
                email={formData.email}
                phone={formData.intlPhoneInput}
                category={formData.category}
                password={formData.password}
                agreement={formData.agreement}
                handleChange={this.handleChange}
                handleShowPasswordClick={this.handleShowPasswordClick}
                handleRegisterClick={this.handleFooterBtnClick}
              />
              
              </>
            );
           case 2:
            return (
              
              <SecurityForm
              securityCode={formData.securityCode}
              handleChange={this.handleChange}
              goToPrevStep={this.goToPrevStep}
              handleSaveBtnClick={this.handleFooterBtnClick}
              />
            );
         case 3:
            return (
              <ProfileForm
                name={formData.name}
                website={formData.website}
                handleChange={this.handleChange}
                country={formData.country}
                avatar={formData.avatar}
                goToPrevStep={this.goToPrevStep}
                handleSaveBtnClick={this.handleFooterBtnClick}
                handleAvatarChange={this.handleAvatarChange}
              />
            );
           case 4:
            const {
              name,
              category,
              email,
              country,
              intlPhoneInput,
              website,
              avatar
            } = formData;
            return (
              <ThankYou
                avatar={avatar.value}
                name={name.value}
                category={category.value}
                email={email.value}
                country={country.value}
                intlPhoneInput={intlPhoneInput.value}
                website={website.value}
              />
            ); 
          default:
            return null;
        }
      };

    render(){
        const { steps, activeStep } = this.state;
    return (
        <div className="container mt-5">
            <TextPlaceHolder   
                header="Test task of CryptoPolice"
                content="You need to create frontend and backend part of this webpage" />
            <StepperHorizontal 
                  steps={ steps } 
                  activeStep={ activeStep -1 } 
                  activeColor="#17a2b8" 
                  activeBorderColor="#17a2b8"
                  completeColor="#17a2b8" 
                  completeTitleColor="#17a2b8" 
                  completeBarColor="#17a2b8"
            />
            <TemplateCard> 
            <form>{this.displayStepForm()}</form>
            </TemplateCard>
        </div>
       
    );}

}

export default MainAppContainer;