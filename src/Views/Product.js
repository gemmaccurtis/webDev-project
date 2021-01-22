import React, { useState } from "react";
import PropTypes from "prop-types";
import Tile from "../Components/Tile";
import styled from "styled-components";
import ProductForm from "../Components/ProductForm";
import ProductNew from "../Components/ProductNew";
import thumbsUp from "../assets/thumbs-up.svg";
import { useHistory } from "react-router-dom";

const StyledCheckedIn = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;

const StyledThumbsUp = styled.div`
  background: url(${thumbsUp}) no-repeat left top;
  width: 150px;
  height: 150px;
`;

const Product = (props) => {
  const { user, createProduct } = props;
  const [productNew, setCheckedIn] = useState(false);
  let history = useHistory();

  const handleSubmit = async (product) => {
    setCheckedIn(true);
    const ckin = {
      ...product,
      ...{
        photo: user.photoURL,
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };
    await createProduct(ckin);
    setTimeout(() => history.push('/'), 3000);
  };

  return (
    <React.Fragment>
      {!productNew ? (
        <StyledTile>
          <StyledHeading> Add new Product </StyledHeading>
          <ProductForm onSubmit={handleSubmit} />
        </StyledTile>
      ) : (
        <productNew />
      )}
    </React.Fragment>
  );
};

Product.propTypes = {
  user: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,

};

export default Product;
