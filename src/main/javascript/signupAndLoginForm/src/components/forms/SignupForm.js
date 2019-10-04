import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Button
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/registrationAction";
import { handleBlur } from "../../functions/handleBlur";
import { validateEmail, validatePassword } from "../../functions/validations";

export class SignupForm extends Component {
  state = {
    userFName: "",
    userLName: "",
    userGender: "",
    date: "",
    month: "",
    year: "",
    userEmail: "",
    username: "",
    userPassword: "",
    confirmUserPassword: ""
  };
  static propTypes = {
    registerNewUser: PropTypes.func.isRequired,
    dataFromDb: PropTypes.object.isRequired
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { dataFromDb } = nextProps;
      if (dataFromDb.registeredUser !== undefined) {
        const addedUser = dataFromDb.registeredUser;
        const username = addedUser.username;
        const password = addedUser.password;
        const registrationForm = document.getElementById("registration-form");
        const loginForm = document.getElementById("login-form");
        const usernameInput = document.getElementById("username-input");
        const passwordInput = document.getElementById("password-input");

        usernameInput.value = username;
        passwordInput.value = password;
        loginForm.classList.remove("hidden-div");
        registrationForm.classList.add("hidden-div");
      } else {
        console.log("Bad code");
      }
    } else {
      console.log("No new Props received");
    }
  }
  handleTyping = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**HANDLING NAMES TYPING, FOCUS, BLUR */
  handelUserFNameFocus = event => {
    event.preventDefault();
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.add("black-element");
    infoDiv.innerHTML =
      "Shyiramo izina ry'umuryango cyangwa andi mazina. Amazina yemewe agomba kuba" +
      " nibura arengeje inyuguti eshatu (3). Icyitonderwa:Aka kazu ntabwo wemerewe " +
      "kugasimbuka utakujuje.";
  };

  /**HNADLING DATE SELECTION, FOCUS,  */
  handleDateOfBirthDivBlur = event => {
    const dateValue = document.getElementById("datesInput").value;
    const monthValue = document.getElementById("monthsInput").value;
    const yearValue = document.getElementById("yearsInput").value;
    const infoDiv = document.getElementById("info-div");

    if (yearValue !== "") {
      if (yearValue % 4 === 0) {
        switch (monthValue) {
          case "":
            infoDiv.classList.remove("hidden-div");
            infoDiv.classList.remove("black-element");
            infoDiv.classList.add("field-error");
            infoDiv.innerHTML = "Hitamo ukwezi";

            this.setState({
              date: "",
              month: "",
              year: ""
            });
            break;
          case "Gashyantare":
            switch (dateValue) {
              case "30":
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Kabiri (Gashyantare) muri " +
                  yearValue +
                  " kwagize iminsi 29 gusa!";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Mata":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Kane (Mata) kugira iminsi 30 gusa.";
                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";
                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Kamena":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Gatandatu (Kamena) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Nzeli":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Cyenda (Nzeli) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Ugushyingo":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Cumi na kumwe (Ugushyingo) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          default:
            this.setState({
              date: dateValue,
              month: monthValue,
              year: yearValue
            });
        }
      } else {
        switch (monthValue) {
          case "":
            infoDiv.classList.remove("hidden-div");
            infoDiv.classList.remove("black-element");
            infoDiv.classList.add("field-error");
            infoDiv.innerHTML = "Hitamo ukwezi";

            this.setState({
              date: "",
              month: "",
              year: ""
            });
            break;
          case "Gashyantare":
            switch (dateValue) {
              case "29":
              case "30":
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Kabiri (Gashyantare) muri " +
                  yearValue +
                  " kwagize iminsi 28 gusa!";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Mata":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Kane (Mata) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Kamena":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Gatandatu (Kamena) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Nzeli":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Cyenda (Nzeli) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          case "Ugushyingo":
            switch (dateValue) {
              case "31":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML =
                  "Ukwezi kwa Cumi na kumwe (Ugushyingo) kugira iminsi 30 gusa.";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              case "":
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.remove("black-element");
                infoDiv.classList.add("field-error");
                infoDiv.innerHTML = "Hitamo italiki";

                this.setState({
                  date: "",
                  month: "",
                  year: ""
                });
                break;
              default:
                this.setState({
                  date: dateValue,
                  month: monthValue,
                  year: yearValue
                });
            }
            break;
          default:
            this.setState({
              date: dateValue,
              month: monthValue,
              year: yearValue
            });
        }
      }
    } else {
      infoDiv.classList.remove("hidden-div");
      infoDiv.classList.remove("black-element");
      infoDiv.classList.add("field-error");
      infoDiv.innerHTML = "Hitamo umwaka";

      this.setState({
        date: "",
        month: "",
        year: ""
      });
    }
  };

  handleDatesDivFocus = () => {
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.add("black-element");
    infoDiv.innerHTML =
      "Mu gihe ugiye guhitamo amataliki wavukiyeho, menya ko <br /><br/> " +
      "<h5 className='text-center text-success'>Ubusobanuro bw'amezi</h5><br/>" +
      "<p>Mutarama = ukwezi kwa mbere kugira iminsi 31 <br />" +
      "Gashyantare = ukwezi kwa Kabiri kugira iminsi 28 cyangwa 29 bitewe n'umwaka wahisemo<br />" +
      "Werurwe = ukwezi kwa Gatatu kugira iminsi 31<br />" +
      "Mata = ukwezi kwa Kane kugira iminsi 30<br />" +
      "Gicurasi = ukwezi kwa Gatanu kugira iminsi 31<br />" +
      "Kamena = ukwezi kwa Gatndatu kugira iminsi 30<br />" +
      "Nyakanga = ukwezi kwa Karindwi kugira iminsi 31<br />" +
      "Kanama = ukwezi kwa Munani kugira iminsi 31<br />" +
      "Nzeli = ukwezi kwa Cyenda kugira iminsi 30<br />" +
      "Ukwakira = ukwezi kwa Cumi kugira iminsi 31<br />" +
      "Ugushyingo = ukwezi kwa Cumi na kumwe kugira iminsi 30<br />" +
      "Ukuboza = ukwezi kwa Cumi n'abiri kugira iminsi 31<br /></p";
  };

  /**HANDLING EMAIL TYPING, FOCUS */
  handelUserEmailFocus = event => {
    event.preventDefault();
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.add("black-element");
    infoDiv.innerHTML =
      "Shyiramo email yawe izadufasha kujya tuvugana nawe " +
      "igihe tugufitiye amakuru agufitiye umumaro.";
  };

  handleUserEmailTyping = () => {
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.remove("black-element");
    infoDiv.classList.remove("field-error");
    infoDiv.classList.remove("field-success");
    const email = event.target.value;
    if (email.length >= 5) {
      if (validateEmail(email)) {
        this.setState({ userEmail: email });
        infoDiv.classList.remove("field-error");
        infoDiv.classList.add("field-success");
        infoDiv.innerHTML = email + " noneho yo ni nzima";
      } else {
        infoDiv.classList.add("field-error");
        infoDiv.innerHTML =
          "Iyo e-mail :<strong> <em>" +
          email +
          "</em></strong> ushyizemo ntabwo yemewe, kuberako itabaho";
        this.setState({ userEmail: "" });
      }
    } else {
      infoDiv.classList.add("field-error");
      infoDiv.innerHTML =
        email + " ntabwo imeze nkuko e-mail ziba zimeze, ongera uyandike neza";
      this.setState({ userEmail: "" });
    }
  };
  /**HANDLE USERNAME TYPING, FOCUS */
  handleUsernameTyping = event => {
    const username = event.target.value;
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.remove("field-success");
    infoDiv.classList.remove("field-error");
    infoDiv.classList.remove("black-element");
    if (username.length >= 3) {
      infoDiv.classList.add("field-success");
      infoDiv.innerHTML = "username washyizemo nta kibazo ifite";
      this.setState({ username: username });
    } else {
      infoDiv.classList.add("field-error");
      infoDiv.innerHTML =
        "username nziza igomba kugira nibura inyuguti ziri hejuru y'eshatu (3)";
      this.setState({ username: "" });
    }
  };

  /**HANDLE PASSWORD TYPING */
  handlePasswordTyping = event => {
    const password = event.target.value;
    const infoDiv = document.getElementById("info-div");
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.remove("field-success");
    infoDiv.classList.remove("field-error");
    infoDiv.classList.remove("black-element");
    if (validatePassword(password) === "error") {
      infoDiv.classList.add("field-error");
      infoDiv.innerHTML =
        "Shyiramo ijambo ry'ibanga kugirango umutekano wawe ube wizewe";
      this.setState({ userPassword: "" });
    } else {
      infoDiv.innerHTML = validatePassword(password);
      this.setState({ userPassword: password });
    }
  };

  /**HANDLING CONFIRM PASSWORD TYPING */
  handleConfirmPasswordTyping = event => {
    const passwordValue = this.state.userPassword;
    const confirmPasswordValue = event.target.value;

    const infoDiv = document.getElementById("info-div");

    this.setState({ confirmUserPassword: confirmPasswordValue });
    infoDiv.classList.remove("hidden-div");
    infoDiv.classList.remove("black-element");

    if (passwordValue !== confirmPasswordValue) {
      infoDiv.classList.add("field-error");
      infoDiv.classList.remove("field-success");
      infoDiv.innerHTML =
        "Ijambo ry'ibanga washyizemo ntabwo risa n'irya mbere...";
    } else {
      infoDiv.classList.remove("field-error");
      infoDiv.classList.add("field-success");
      infoDiv.innerHTML = "Ubu noneho amagambo y'ibanga yose arasa";
    }
  };
  handleConfirmPasswordBlur = event => {
    const passwordInfoDiv = document.getElementById("password-info-div");
    const currElt = event.target;
    passwordInfoDiv.classList.add("hidden-div");
    if (currElt.value.length < 3) {
      currElt.classList.add("field-error");
    } else {
      currElt.classList.remove("field-error");
    }
  };

  /**HANDLING SUBMITTING NEW USER */
  handleSubmitUser = () => {
    /**FORMULATING Month OF BIRTH DEPENDING ON CHOSEN MONTH */
    const chosenMonth = document.getElementById("monthsInput").value;
    let monthInNumber;
    switch (chosenMonth) {
      case "Mutarama":
        monthInNumber = "01";
        break;
      case "Gashyantare":
        monthInNumber = "02";
        break;
      case "Werurwe":
        monthInNumber = "03";
        break;
      case "Mata":
        monthInNumber = "04";
        break;
      case "Gicurasi":
        monthInNumber = "05";
        break;
      case "Kamena":
        monthInNumber = "06";
        break;
      case "Nyakanga":
        monthInNumber = "07";
        break;
      case "Kanama":
        monthInNumber = "08";
        break;
      case "Nzeli":
        monthInNumber = "09";
        break;
      case "Ukwakira":
        monthInNumber = "10";
        break;
      case "Ugushyingo":
        monthInNumber = "11";
        break;
      case "Ukuboza":
        monthInNumber = "12";
        break;
    }
    /**END OF FORMULATING DEPENDING ON CHOSEN MONTH */

    const userFName = this.state.userFName;
    let userLName = this.state.userLName;
    const userGender = this.state.userGender;
    let userDateOfBirth =
      this.state.year + "-" + monthInNumber + "-" + this.state.date;
    const userEmail = this.state.userEmail;
    const username = this.state.username;
    const userPassword = this.state.userPassword;
    const confirmUserPassword = this.state.confirmUserPassword;
    const userAuthorities = "ADMIN";

    if (
      this.state.year === "" ||
      this.state.month === "" ||
      this.state.date === ""
    ) {
      userDateOfBirth = "";
    }

    const infoDiv = document.getElementById("info-div");

    if (userFName.length >= 3) {
      infoDiv.classList.add("hidden-div");
      infoDiv.classList.remove("field-error");
      infoDiv.innerHTML = "";
      if (userLName.length === 0) {
        userLName = "";
      }
      if (userGender.length > 0) {
        infoDiv.classList.add("hidden-div");
        infoDiv.classList.remove("field-error");
        infoDiv.innerHTML = "";
        if (userDateOfBirth.length !== 0) {
          infoDiv.classList.add("hidden-div");
          infoDiv.classList.remove("field-error");
          infoDiv.innerHTML = "";
          if (userEmail.includes("@")) {
            infoDiv.classList.add("hidden-div");
            infoDiv.classList.remove("field-error");
            infoDiv.innerHTML = "";
            if (username.length !== 0) {
              infoDiv.classList.add("hidden-div");
              infoDiv.classList.remove("field-error");
              infoDiv.innerHTML = "";
              if (userPassword.length !== 0) {
                if (userPassword === confirmUserPassword) {
                  infoDiv.classList.add("hidden-div");
                  infoDiv.classList.remove("field-error");
                  infoDiv.innerHTML = "";
                  /**SUBMITING USER */
                  const userFormData = new FormData();
                  userFormData.append("userId", null);
                  userFormData.append("userFName", userFName);
                  userFormData.append("userLName", userLName);
                  userFormData.append("userGender", userGender);
                  userFormData.append("userDateOfBirth", userDateOfBirth);
                  userFormData.append("userEmail", userEmail);
                  userFormData.append("username", username);
                  userFormData.append("userPassword", userPassword);
                  userFormData.append("userAuthorities", userAuthorities);

                  this.props.registerNewUser(userFormData);
                } else {
                  infoDiv.classList.remove("hidden-div");
                  infoDiv.classList.add("field-error");
                  infoDiv.classList.remove("field-success");
                  infoDiv.classList.remove("black-element");
                  infoDiv.innerHTML =
                    "Ijambo ry'ibanga ryawe ryanditse nabi, ushobora kuzaryibagirwa, ongera uryandike neza";
                }
              } else {
                infoDiv.classList.remove("hidden-div");
                infoDiv.classList.add("field-error");
                infoDiv.classList.remove("field-success");
                infoDiv.classList.remove("black-element");
                infoDiv.innerHTML =
                  "Ijambo ry'ibanga ryawe ni ngombwa kugirango konti yawe ibe ifite umutekano";
              }
            } else {
              infoDiv.classList.remove("hidden-div");
              infoDiv.classList.add("field-error");
              infoDiv.classList.remove("field-success");
              infoDiv.classList.remove("black-element");
              infoDiv.innerHTML =
                "Shyiramo username uzajya ukoresha ushaka kwinjira muri konti yawe";
            }
          } else {
            infoDiv.classList.remove("hidden-div");
            infoDiv.classList.add("field-error");
            infoDiv.classList.remove("field-success");
            infoDiv.classList.remove("black-element");
            infoDiv.innerHTML =
              "e-mail washyizemo ntabwo ibaho, shyiramo e-mail ibaho, bizatuma tubasha kuvugana nawe igihe tuzaba tugufitiye amakuru agufitiye inyungu";
          }
        } else {
          infoDiv.classList.remove("hidden-div");
          infoDiv.classList.remove("field-success");
          infoDiv.classList.remove("black-element");
          infoDiv.classList.add("field-error");
          infoDiv.innerHTML = "";
          infoDiv.innerHTML =
            "Italiki y'amavuko ifite ikibazo, ongera uyihitemo neza, ukurikize amategeko n'amabwiriza kuko birakurikizwa!";
        }
      } else {
        infoDiv.classList.remove("hidden-div");
        infoDiv.classList.add("field-error");
        infoDiv.classList.remove("field-success");
        infoDiv.classList.remove("black-element");
        infoDiv.innerHTML =
          "Hitamo igitsina cyawe, kuko bidufasha kuguha amakuru ajyanye n'ibyo ukunda";
      }
    } else {
      infoDiv.classList.remove("hidden-div");
      infoDiv.classList.add("field-error");
      infoDiv.classList.remove("field-success");
      infoDiv.classList.remove("black-element");
      infoDiv.innerHTML =
        "Ntabwo wemerewe kwandika izina ry'umuryango rifite inyuguti ziri munsi y'inyuguti eshatu (3)";
    }
  };
  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <div className="col-md-6 mr-auto">
              <Container className="h-100">
                <div className="row h-100 justify-content-center align-items-center">
                  <div
                    id="info-div"
                    className="hidden-div text-left rounded-corner bordered-element"
                  ></div>
                </div>
              </Container>
            </div>
            <div className="col-md-6 ml-auto">
              <Row className="mt-2">
                <Card>
                  <div className="hidden-div black-element" id="login-form">
                    <CardHeader>
                      <h4 className="text-info text-center">
                        Umwirondoro wawe wemewe, kanda kuri iyo buto (button)
                        y'icyatsi kibisi, ubundi winjire muri konti yawe
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <Form action="login" method="POST">
                        <Input
                          type="text"
                          placeholder="username"
                          className="rounded-corner form-control-sm col-md-12"
                          name="username"
                          id="username-input"
                          hidden
                        />
                        <Input
                          type="password"
                          placeholder="password"
                          className="rounded-corner form-control-sm col-md-12"
                          name="password"
                          id="password-input"
                          hidden
                        />
                        <Button
                          type="submit"
                          className="btn-success rounded-corner btn-lg col-md-12 p-5"
                        >
                          Injira muri konti yawe
                        </Button>
                      </Form>
                    </CardBody>
                  </div>
                  <div id="registration-form">
                    <CardHeader>
                      <h3 className="text-success text-center">
                        Iyandikishe hano
                      </h3>
                    </CardHeader>
                    <CardBody>
                      {/**NAMES */}
                      <div className="form-group form-row">
                        <div className="col-md-6">
                          <Input
                            type="text"
                            name="userFName"
                            id="userFName"
                            placeholder="Izina ry'umuryango cg andi mazina"
                            className="rounded-left-corners"
                            onChange={this.handleTyping}
                            onFocus={this.handelUserFNameFocus}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            type="text"
                            name="userLName"
                            id="userLName"
                            placeholder="Izina ry'idini cg irindi zina"
                            className="rounded-right-corners"
                            onChange={this.handleTyping}
                          />
                        </div>
                      </div>
                      {/**END OF NAMES */}

                      {/**GENDER */}
                      <div className="text-center">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            value="Umugabo"
                            id="user-umugabo"
                            name="userGender"
                            className="custom-control-input"
                            onChange={this.handleTyping}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="user-umugabo"
                          >
                            Umugabo
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            value="Umugore"
                            id="user-umugore"
                            name="userGender"
                            className="custom-control-input"
                            onChange={this.handleTyping}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="user-umugore"
                          >
                            Umugore
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            value="ikindi_gitsina"
                            id="user-ikindi-gitsina"
                            name="userGender"
                            className="custom-control-input"
                            onChange={this.handleTyping}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="user-ikindi-gitsina"
                          >
                            Ikindi gitsina
                          </label>
                        </div>
                      </div>

                      {/**END OF GENDER */}
                      {/**DATE OF BIRTH */}

                      <div>
                        <div className="form-group form-row mt-4">
                          <div className="col-md-12 text-center">
                            <h5 className="text-info">Italiki y'amavuko</h5>
                          </div>
                        </div>

                        <div
                          className="form-group form-row"
                          onFocus={this.handleDatesDivFocus}
                          onBlur={this.handleDateOfBirthDivBlur}
                        >
                          <div className="col-md-4">
                            <select
                              name="date"
                              className="custom-select rounded-left-corners"
                              id="datesInput"
                            >
                              <option value="">---Italiki---</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                              <option value="21">21</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <select
                              name="month"
                              className="custom-select"
                              id="monthsInput"
                            >
                              <option value="">---Ukwezi---</option>
                              <option value="Mutarama">1.Mutarama</option>
                              <option value="Gashyantare">2.Gashyantare</option>
                              <option value="Werurwe">3.Werurwe</option>
                              <option value="Mata">4.Mata</option>
                              <option value="Gicurasi">5.Gicurasi</option>
                              <option value="Kamena">6.Kamena</option>
                              <option value="Nyakanga">7.Nyakanga</option>
                              <option value="Kanama">8.Kanama</option>
                              <option value="Nzeli">9.Nzeli</option>
                              <option value="Ukwakira">10.Ukwakira</option>
                              <option value="Ugushyingo">11.Ugushyingo</option>
                              <option value="Ukuboza">12.Ukuboza</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <select
                              name="year"
                              className="rounded-right-corners custom-select"
                              id="yearsInput"
                            >
                              <option value="">---Umwaka---</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                              <option value="1909">1909</option>
                              <option value="1908">1908</option>
                              <option value="1907">1907</option>
                              <option value="1906">1906</option>
                              <option value="1905">1905</option>
                              <option value="1904">1904</option>
                              <option value="1903">1903</option>
                              <option value="1902">1902</option>
                              <option value="1901">1901</option>
                              <option value="1900">1900</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/**END OF DATE OF BIRTH */}
                      {/**EMAIL */}
                      <div className="form-group form-row">
                        <div className="col-md-12">
                          <Input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            placeholder="e-mail"
                            className="rounded-left-corners rounded-right-corners"
                            onChange={this.handleUserEmailTyping}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      {/**END OF EMAIL */}
                      {/**USERNAME */}
                      <div className="form-group form-row">
                        <div className="col-md-12">
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            className="rounded-left-corners rounded-right-corners"
                            onChange={this.handleUsernameTyping}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      {/**END OF USERNAME */}
                      {/**PASSWORD */}
                      <div className="form-group form-row">
                        <div className="col-md-12">
                          <Input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            placeholder="ijambo ry'ibanga"
                            className="rounded-left-corners rounded-right-corners"
                            onChange={this.handlePasswordTyping}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      {/**END OF PASSWORD */}
                      {/**CONFIRM PASSWORD */}
                      <div className="form-group form-row">
                        <div className="col-md-12">
                          <Input
                            type="password"
                            name="confirmUserPassword"
                            id="confirmUserPassword"
                            placeholder="hamya ijambo ry'ibanga"
                            className="rounded-left-corners rounded-right-corners"
                            onChange={this.handleConfirmPasswordTyping}
                            onBlur={this.handleConfirmPasswordBlur}
                          />
                        </div>
                      </div>
                      {/**END OF CONFIRM PASSWORD */}
                      {/**PASSWORD MISSMATCH ERROR */}
                      <div
                        className="form-group form-row hidden-div"
                        id="password-info-div"
                      >
                        <div className="col-md-12 text-center">
                          <span
                            id="password-info-span"
                            className="rounded-corner"
                          ></span>
                        </div>
                      </div>
                      {/**END OF PASSWORD MISSMATCH ERROR */}
                      {/**BUTTON*/}
                      <div className="form-group form-row">
                        <div className="col-md-12">
                          <Button
                            onClick={this.handleSubmitUser}
                            className="rounded-left-corners rounded-right-corners btn-block btn-success"
                          >
                            Ohereza umwirondoro wawe
                          </Button>
                        </div>
                      </div>
                      {/**END OF BUTTON*/}
                    </CardBody>
                  </div>
                </Card>
              </Row>
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataFromDb: state.myReducers
});

export default connect(
  mapStateToProps,
  { registerNewUser }
)(SignupForm);
