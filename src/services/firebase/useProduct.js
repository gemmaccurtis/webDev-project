function useProduct(fStore) {
  const ref = fStore().collection('checkins');
  const createProduct  = checkin => ref.add(checkin);
  const readProducts = () => ref.get();

  // below we add the methods to create a sub collection to hold checkin comments
  const createComment = (productID, comment) => ref.doc(productID).collection('comments').add(comment); 
  const readComments = (productID) => ref.doc(productID).collection('comments').get();


  return {createProduct, readProducts, createComment, readComments}
}
export default useProduct;
