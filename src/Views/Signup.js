import React, {useState} from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import Tile from "../Components/Tile";
import { Link } from "react-router-dom";
import Form from "../Components/LoginForm";
import Button from "../Components/Button";
import ErrorLabel from "../Components/ErrorLabel"

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

const StyledTile2 = styled(Tile)`
text-align: center;
margin-top: 2%;
color: ${({ theme }) => theme.colors.blue};
`;

const StyledHeading = styled.h2`
text-align: center;
margin-top: 2%;
color: ${({ theme }) => theme.colors.blue};
`;
const StyledLink = styled(Link)`
text-align: center;
`;



function Signup(props) {

  const {createEmailUser, signInWithProvider, buttonText, serverError, onClick} = props;
  const [error, setError] = useState();
  

  const handleSubmit = async (data) => {
    
    const {email, password} = data;
    
    try {
      await createEmailUser(email, password);
    } catch (error) {
      setError(error.message);
    }
    
  }

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  }

  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>OPERATIONS </StyledHeading>
        <StyledHeading>ATH STATUS </StyledHeading>
        <StyledTile2> Select an option below to sign up</StyledTile2>
        <Form onSocialLogin={handleSocialLogin} onSubmit={handleSubmit} serverError={error} />
        <Button onClick={() => "/Login" } text={buttonText} />  
        <ErrorLabel>{serverError}  </ErrorLabel>
      </StyledTile>
    </StyledWrapper>
  );
}

Signup.propTypes = {
  buttonText: PropTypes.string,
  createEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired

};

Signup.defaultProps = {
  buttonText: "Login",
  serverError: '',
};

export default Signup;
