import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tile from "../Components/Tile";
import ErrorLabel from "../Components/ErrorLabel"
import { Link } from "react-router-dom";
import Form from "../Components/LoginForm";
import Button from "../Components/Button";
import Image from "../assets/login-background.jpg"

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  @media (min-width: 600px) {
    width: 30%;
  }
`;


const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 5%;
  color: ${({ theme }) => theme.colors.blue};
`;
const StyledButton = styled(Button)`
  text-align: center;
`;

const image = {Image};


function Login(props) {
  const { signInEmailUser, signInWithProvider, buttonText, serverError, onClick, view} = props;
  const [error, setError] = useState();


  const handleSubmit = async data => {
    const { email, password } = data;

    try {
      const user = await signInEmailUser(email, password);
      console.log(user);
    } catch (error) {
      debugger;
      setError(error.message);
    }
  };

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  };
   
  const Design = () => (
    <View style={StyleSheet.container}>
    <Image Source={image} style={StyleSheet.image}>
     
    </Image>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    }
  });


  return (
    <StyledWrapper>

      <StyledTile>
        <StyledHeading>OPERATIONS </StyledHeading>
        <StyledHeading>ATH STATUS</StyledHeading>
        <Form
          onSocialLogin={handleSocialLogin}
          serverError={error}
          onSubmit={handleSubmit}
          buttonText="Login"
        />
        <Button onClick={() => "/Signup" } text={buttonText} />  
        <ErrorLabel>{serverError}  </ErrorLabel>
        
        
      </StyledTile>
    </StyledWrapper>
  );
}

Login.propTypes = {
  buttonText: PropTypes.string,
  signInEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired
};

Login.defaultProps = {
  buttonText: "Sign Up",
  onClick: "/Signup",
  serverError: '',
};



export default Login;
