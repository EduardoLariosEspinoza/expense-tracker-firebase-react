function useGetUserInfo() {
  if (!localStorage.getItem("auth")) {
    return { name: null, profilePhoto: null, userID: null, isAuth: false };
  }
  
  const { name, profilePhoto, userID, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, userID, isAuth };
}

export default useGetUserInfo;
