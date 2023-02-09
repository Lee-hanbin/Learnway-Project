import React, { useState } from "react";
import SelectBtn from "./InterestIcon";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    accessToken,
    loginUser,
    registerUser,
} from "../actions/userAction";
import { setRefreshToken } from "../utils/Cookie";

const SelectFrame = styled.div`
    width: 382px;
    height: 599px;
    display: flex;
    flex-wrap: wrap;
    margin: 138px 71px 0px 0px;
`;

export default function InterestSelect({
    flag,
    ChangeInterest,
    handleclose,
    userinfo,
    itdata,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [lst, setLst] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let itobj = [];

    // (회원가입시->2)취향을 선택하고 버튼을 클릭하면 회원가입 요청 후, 자동 로그인
    // (회원정보수정시->1)취향 선택하고 버튼 클릭하면 ChangeInterest에 취향 정보 담아 올림 + 모달닫기
    const handleSubmit = (e) => {
        e.preventDefault();

        // 선택 갯수
        console.log(lst)
        console.log(itobj)
        const selectedNum = lst.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
        console.log(selectedNum)

        // 세개 이상 선택 확인.
        if (selectedNum < 3) {
            alert ("Please select more than 3")
        } else {

            
            // 설정된 취향 데이터를 정제한다.
            for (let i = 0; i < itdata.length; i++) {
                if (lst[i]) {
                    const tmp = {
                        field: itdata[i].field,
                        interestId: i + 1,
                    };
                    itobj.push(tmp);
                }
            }
            
            //////// 1. 회원정보 수정 로직
            if (flag === "edit") {
                ChangeInterest(itobj);
                handleclose();
                
                ////////// 2. 회원가입 로직
            } else {
                function add(key, value) {
                    return { ...userinfo, [key]: value };
                }
                
                const userDto = add("interests", itobj);
                
                // 회원가입 요청 후, 로그인
                registerUser(userDto).payload
                    .then((res) => {
                        const status = res.status;
                        const msg = res.msg;
                        if (status === 200) {
                            console.log(msg);
                            const body = {userEmail: userinfo.userEmail, userPwd: userinfo.userPwd }
                            const loadinfo = loginUser(body)
                            loadinfo.payload
                                .then((res) => {
                                    const status = res.status;
                                    const msg = res.msg;
                                    console.log(msg)

                                    if (status === 200) {
                                        console.log(loadinfo, res)
                                        // 스토어에 유저정보 넣기
                                        dispatch({type: loadinfo.type, payload: res.user})

                                        // 쿠키에 Refresh Token 과 email 저장, store에 Access Token 저장
                                        setRefreshToken(res.token.refreshToken);
                                        const getaccessToken = accessToken(res.token);
                                        dispatch({type: getaccessToken.type, payload: getaccessToken.payload});
                                        
                                        // 성공했으면 메인 페이지로 이동
                                        navigate('/');
                                        alert("환영쓰");
                                    } else if (status === 202) {
                                        // 아이디 비밀번호가 틀린 경우,
                                        alert(msg);
                                    }
                                });
                            }
                    })
                    .catch((err) => alert("서버 연결 실패"));
                }
            };
            
        }

    return (
        <form onSubmit={handleSubmit}>
            <SelectFrame>
                {itdata !== ""
                    ? itdata.map((e, idx) => {
                          if (itdata[idx].field === "random") {
                          } else {
                              return (
                                  <SelectBtn
                                      key={idx}
                                      id={idx}
                                      disabled=""
                                      icon={itdata[idx].field}
                                      chk={lst[idx]}
                                      onClick={() => {
                                          const tmplst = [...lst];
                                          tmplst[idx] = (lst[idx] + 1) % 2;
                                          setLst(tmplst);
                                      }}
                                  ></SelectBtn>
                              );
                          }
                      })
                    : null}
            </SelectFrame>
            {flag === "edit" ? (
                <button>selected</button>
            ) : (
                <button button> Next</button>
            )}
        </form>
    );
}

// chk = 1 : button 클릭
// chk = 0 : button 미클릭
