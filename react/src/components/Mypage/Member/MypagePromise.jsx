import { Label, PromiseUpdateBtn, RightDiv, RightInput, BtnDiv } from "./Member.style";
import { useEffect, useState } from "react";
import axios from "axios";

// React의 컴포넌트 간 데이터 전달(= props)
// 로그인 기능 구현되면 testToken 수정하기
const MypagePromise = ( {testToken} ) => {

  const [userPromise, setUserPromise] = useState(""); // 나의 다짐
  const [promiseExists, setPromiseExists] = useState(false); // 등록인지 수정인지 판단

  // 나의 다짐 조회
  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const response = await axios.get("http://localhost/promise/me", {
          headers: {
            Authorization: `Bearer ${testToken}`,
          },
        });
        setUserPromise(response.data.userPromise);
        setPromiseExists(true); // 다짐이 이미 존재함
      } catch (error) {
        console.error("나의 다짐 불러오기 실패", error);
        setPromiseExists(false); // 다짐 없음
      }
    };
    fetchUserData();
  }, []);

  // 나의 다짐 등록하기
  const handleInsert = async () => {
    try{
      await axios.post("http://localhost/promise", {
        userPromise: userPromise,
      }, {
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
      alert("나의 다짐이 등록되었습니다.");
      setPromiseExists(true); // 이후부터는 다짐 수정

    } catch (error) {
      console.error("등록 실패", error);
      alert("등록 중 오류 발생");
    }
  };
  
  // 나의 다짐 수정하기
  const handleUpdate = async () => {
    try{
      await axios.put("http://localhost/promise/me", {
        userPromise: userPromise,
      }, {
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
      alert("나의 다짐이 수정되었습니다.");

    } catch(error) {
      console.error("수정 실패", error);
      alert("수정 중 오류 발생");
    }
  };

  return(
    <>
      <RightDiv>
          <Label>나의 다짐</Label>
          <RightInput 
              value={userPromise}
              onChange={(e) => setUserPromise(e.target.value)}
              cols={30} 
              rows={5} 
              maxLength={200}
              placeholder="나의 다짐을 작성해주세요."
          />

          <BtnDiv>
            {promiseExists ? (
              <PromiseUpdateBtn onClick={handleUpdate}>나의 다짐 수정하기</PromiseUpdateBtn>
            ) : (
              <PromiseUpdateBtn onClick={handleInsert}>나의 다짐 등록하기</PromiseUpdateBtn>
            )}
          </BtnDiv>
        </RightDiv>
    </>
  );
};

export default MypagePromise;