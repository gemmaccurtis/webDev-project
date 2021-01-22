import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Product from "../Components/Product";
import avatarPlaceHolder from "../assets/avatar_placeholder.png"
import * as dayjs from 'dayjs';


function Dash(props) {

  const { user, readProducts,readChallenges, createComment, readComments} = props;
  const [allProducts, setAllProducts] = useState([]);
 
   const handleComment = async (productId, comment) => {
    
    await createComment(productId, comment);

   }

  useEffect(() => {

    const getAllProducts =  async () => {
      const aProducts =  await readProducts();
      let products = [];
      aProducts.forEach(c => products.push({...c.data(),...{id:c.id} }));
      setAllProducts(products)
    }
  }, [])



  return (
    <div>
      
      {
        allProducts.map( (c) => <Product onComment={handleComment} userProfilePicture={user.photoURL || avatarPlaceHolder}  user={user} checkin={c} readComments={readComments} />)
      }
      
    </div>
  );
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    readProducts: PropTypes.object.isRequired
};

export default Dash;


