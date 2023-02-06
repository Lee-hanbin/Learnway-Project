const userInfo = {
    "userId":"",
    "userEmail":"ccc@ssafy.com",
    "userPwd":"1234",
    "name":"Yejin",
    "birthDay":"1995-12-12",
    "languageId":"Korean",
    "badUser":"",
    "imgUrl":"",
    "bio":"잘부탁드립니다."
  };
  
  function UserStore(state = userInfo, action){
    //store에 저장된 상태정보 수정(마이페이지에서 개인정보 수정 후, 업데이트 요청을 보내면 API로부터 다시 받아와서 갱신함)
    if(action.type === 'update'){
      ///API로부터 가져오는 부분
      /** 
        body 
      **/
  
      return state; 
    }
    else if(action.type ==='delete'){
      //사용자 정보 상태정보 삭제
  
      //삭제하는 로직
      for (const key of state.keys()) {
        if (key.match('*')) {
          state.delete(key);
        }
      }
  
      return state;
    }
    else{
      return state;
    }
  }

  export default UserStore;