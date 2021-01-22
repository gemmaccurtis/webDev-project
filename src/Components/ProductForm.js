import React, { useState, useEffect, Component } from "react";
import PropTypes from 'prop-types';
import Tile from "./Tile";
import styled from "styled-components";
import Button from "./Button";
import ErrorLabel from "./ErrorLabel";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  background: background;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.blue};
`;

const StyledLabel = styled.label`
  text-align: left;
  margin-top: 5%;
`;

const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
`;
const StyledProductP = styled.p`
  display: flex;
  font-size: 13px;
  justify-content: space-around;
  margin-top: 5%;
  input:nth-child(1) {
    background: blue;
  }

  input:checked {
    background-color: #a77e2d !important;
    color: #ffffff !important;
  }
`;


const StyledSelect = styled.select`
  padding-left: 25%;
  text-indent: 40%;
  background: white;
  width: 135px;
  height: 44px;
  font-size: 14px;
  color: rgba(31, 32, 65, 0.75);
`;

const StyledIcon = styled.img`
  margin-right: -10px;
  z-index: 2000;
  display: relative;
  position: absolute;
  margin-top: 10px;
  margin-left: 6px;
`;

const StyledProductTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
    color:  ${({ theme, error}) => error ? "red" : theme.colors.darkShade[25]};
    margin-top: 5%;
  }
`;

const ProductForm = props => {

  const {onSubmit} = props;


  const maxCommentLength = 100; 


  const checkinFormSchema = yup.object().shape({
    name: yup.string().required("Please enter the product named"),
    version: yup.string().required("Please enter the version number"),
    server: yup.string().required("Please enter the server IP address"),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: checkinFormSchema,
    defaultValues: {comment: "", name: "", version: "", server: ""}
  });

  const comment = watch('comment');

  const [remainingCommentCount, setRemainingCommentCount] = useState(maxCommentLength);


  useEffect(() => {
    
      setRemainingCommentCount(maxCommentLength - comment.length);
  
  }, [comment])

   const formValues = watch();
   let productDetails = {
      name: 0,
      version: 0,
      server: 0,
      image: 0
   }

   useEffect(() => {

    productDetails.name = !formValues.name ? 0 : parseInt(formValues.name);
    productDetails.version = !formValues.version ? 0 : parseInt(formValues.version);
    productDetails.server = !formValues.server ? 0 : parseInt(formValues.server);



  const image = watch("image");

  const onFormSubmit = data => {
    onSubmit({...data, ...productDetails});
  };

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {/*JSON.stringify("this is the" + image)*/}
      <StyledLabel>Enter the product name</StyledLabel>
      <StyledProductP>
        {" "}
        <span>
          <input type="text" name="name" ref={register} onChange={this.onChange} /> 
        </span>{" "}
      </StyledProductP>
      <ErrorLabel> {errors.name && errors.name.message} </ErrorLabel>
      <StyledLabel>Enter the baseline version</StyledLabel>
      <StyledProductP>
        <span>
          <input type="radio" name="version" ref={register} onChange={this.onChange} /> 
        </span>
      
      </StyledProductP>
      <ErrorLabel> {errors.version && errors.version.message} </ErrorLabel>
      <StyledLabel>Enter the Server IP address</StyledLabel>
      <StyledProductP>
        <span>
          <input type="radio" name="server" ref={register} onChange={this.onChange} /> 
        </span>
      </StyledProductP>
      <ErrorLabel> {errors.server && errors.server.message} </ErrorLabel>

      <StyledProductTitle  error={remainingCommentCount < 0} >
      <StyledLabel>Comment</StyledLabel> <p>{remainingCommentCount}</p>{" "}
      </StyledProductTitle>
      <textarea rows="3" cols="40" name="comment" ref={register}></textarea>
      <StyledHeading> New Product Added: {"server"} </StyledHeading>
      <Button text="Add Product" type="submit"> </Button>
    </StyledForm>
  );
});

ProductForm.propTypes = {

  onSubmit: PropTypes.func.isRequired
};
}
export default ProductForm;
