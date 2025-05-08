import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container,
  Title,
  Section,
  SectionTitle,
  ContentText,
  Table,
  TableHeader,
  TableCell,
  AgreementContainer,
  CheckboxLabel,
  Checkbox,
  SubmitButton,
  ScrollContainer,
  ErrorMessage
} from "./Agreement.style";

const Agreement = () => {
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [privacyThirdPartyAgreed, setPrivacyThirdPartyAgreed] = useState(false);
  const [privacyRequiredAgreed, setPrivacyRequiredAgreed] = useState(false);
  const [personalInfoAgreed, setPersonalInfoAgreed] = useState(false);
  const [personalInfoRequiredAgreed, setPersonalInfoRequiredAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [marketingOptionalAgreed, setMarketingOptionalAgreed] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const [error, setError] = useState("");

  // 전체 동의 처리
  const handleAllAgreed = (e) => {
    const checked = e.target.checked;
    setAllAgreed(checked);
    setPrivacyThirdPartyAgreed(checked);
    setPrivacyRequiredAgreed(checked);
    setPersonalInfoAgreed(checked);
    setPersonalInfoRequiredAgreed(checked);
    setMarketingAgreed(checked);
    setMarketingOptionalAgreed(checked);
    
    if (checked) {
      setError("");
    }
  };

  // 개별 체크박스 변경 시 전체 동의 상태 업데이트
  const updateAllAgreed = () => {
    if (
      privacyThirdPartyAgreed &&
      privacyRequiredAgreed &&
      personalInfoAgreed &&
      personalInfoRequiredAgreed &&
      marketingAgreed &&
      marketingOptionalAgreed
    ) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  };

  // 다음 단계 버튼 클릭 시 처리
  const handleNextStep = () => {
    // 필수 동의 항목 체크
    if (!privacyRequiredAgreed || !personalInfoRequiredAgreed) {
      setError("필수 약관에 모두 동의해야 합니다.");
      return;
    }
    
    // 세션에 약관 동의 정보 저장 (임시)
    sessionStorage.setItem("agreementInfo", JSON.stringify({
      privacyThirdPartyAgreed,
      privacyRequiredAgreed,
      personalInfoAgreed,
      personalInfoRequiredAgreed,
      marketingAgreed,
      marketingOptionalAgreed
    }));
    
    // 다음 페이지로 이동
    navigate("/signup-type");
  };

  return (
    <Container>
      <Title>약관 동의</Title>
      <Section>
        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            checked={allAgreed}
            onChange={handleAllAgreed}
          />
          전체 약관 및 이용 제공에 동의합니다.
        </CheckboxLabel>
      </Section>

      {/* 1. 이용약관 동의 */}
      <Section>
        <SectionTitle>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={privacyThirdPartyAgreed}
              onChange={(e) => {
                setPrivacyThirdPartyAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            (필수) 이용약관 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;에너지생활플러스 이용약관&gt;
            <br />
            제1조 (목적)<br />
            이 약관은 에너지생활플러스가 제공하는 서비스의 이용과 관련하여 에너지생활플러스와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            <br /><br />
            제2조 (정의)<br />
            1. "서비스"라 함은 에너지생활플러스가 제공하는 인터넷 기반의 모든 서비스를 의미합니다.<br />
            2. "회원"이라 함은 에너지생활플러스에 개인정보를 제공하여 회원등록을 한 자로서, 에너지생활플러스의 정보를 지속적으로 제공받으며 에너지생활플러스가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.<br />
            3. "아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 에너지생활플러스가 승인하는 문자와 숫자의 조합을 의미합니다.
            <br /><br />
            제3조 (약관의 게시와 개정)<br />
            1. 에너지생활플러스는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.<br />
            2. 에너지생활플러스는 필요한 경우 관련법령을 위배하지 않는 범위 내에서 이 약관을 개정할 수 있습니다.<br />
            3. 약관이 개정될 경우 에너지생활플러스는 개정된 약관을 적용하기 7일 전에 홈페이지에 공지합니다.
            <br /><br />
            제4조 (서비스의 제공 및 변경)<br />
            1. 에너지생활플러스는 회원에게 아래와 같은 서비스를 제공합니다.<br />
              - 에너지 절약 관련 정보 제공<br />
              - 탄소중립 포인트 제도 관련 서비스<br />
              - 커뮤니티 서비스<br />
              - 기타 에너지생활플러스가 추가 개발하거나 제휴를 통해 회원에게 제공하는 서비스<br />
            2. 에너지생활플러스는 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우 변경사유, 변경될 서비스의 내용 및 제공일자 등을 명시하여 홈페이지에 공지합니다.
          </ContentText>
        </ScrollContainer>

        <AgreementContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={privacyRequiredAgreed}
              onChange={(e) => {
                setPrivacyRequiredAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            이용약관에 동의합니다.
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={!privacyRequiredAgreed}
              onChange={(e) => {
                setPrivacyRequiredAgreed(!e.target.checked);
                updateAllAgreed();
              }}
            />
            이용약관에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      {/* 2. 개인정보 수집 및 이용 동의 */}
      <Section>
        <SectionTitle>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={personalInfoAgreed}
              onChange={(e) => {
                setPersonalInfoAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            (필수) 개인정보 수집 및 이용 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;개인정보 수집 및 이용 동의&gt;
            <br />
            에너지생활플러스는 회원가입, 서비스 제공 및 민원 처리 등을 위해 아래와 같이 개인정보를 수집 및 이용합니다. 귀하께서는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 동의 거부 시 회원가입 및 서비스 이용이 제한됩니다.
          </ContentText>
          
          <Table>
            <thead>
              <tr>
                <TableHeader>수집항목</TableHeader>
                <TableHeader>수집목적</TableHeader>
                <TableHeader>보유 및 이용기간</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>
                  [필수] 이름, 이메일<br />
                  [선택] 전화번호
                </TableCell>
                <TableCell>
                  - 회원가입 및 관리<br />
                  - 에너지생활플러스 서비스 제공<br />
                  - 서비스 이용 관련 안내 및 문의 대응
                </TableCell>
                <TableCell>회원 탈퇴 시까지<br />(관계법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보존)</TableCell>
              </tr>
            </tbody>
          </Table>
        </ScrollContainer>

        <AgreementContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={personalInfoRequiredAgreed}
              onChange={(e) => {
                setPersonalInfoRequiredAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            개인정보 수집 및 이용에 동의합니다.
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={!personalInfoRequiredAgreed}
              onChange={(e) => {
                setPersonalInfoRequiredAgreed(!e.target.checked);
                updateAllAgreed();
              }}
            />
            개인정보 수집 및 이용에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      {/* 3. 마케팅 정보 수신 동의 (선택) */}
      <Section>
        <SectionTitle>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={marketingAgreed}
              onChange={(e) => {
                setMarketingAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            (선택) 마케팅 정보 수신 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;마케팅 정보 수신 동의&gt;
            <br />
            에너지생활플러스는 회원님께 유익한 정보 및 광고를 제공하기 위해 아래와 같이 개인정보를 수집 및 이용합니다. 마케팅 정보 수신에 동의하지 않더라도 회원가입 및 기본 서비스 이용에는 제한이 없습니다.
            <br /><br />
            1. 수집 및 이용 목적<br />
            - 새로운 서비스 및 이벤트 정보 안내<br />
            - 맞춤형 서비스 및 혜택 제공<br />
            - 광고성 정보 제공
            <br /><br />
            2. 수집 항목<br />
            - 이메일, 전화번호
            <br /><br />
            3. 보유 및 이용 기간<br />
            - 회원 탈퇴 시 또는 마케팅 정보 수신 동의 철회 시까지
          </ContentText>
        </ScrollContainer>

        <AgreementContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={marketingOptionalAgreed}
              onChange={(e) => {
                setMarketingOptionalAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            마케팅 정보 수신에 동의합니다.
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={!marketingOptionalAgreed}
              onChange={(e) => {
                setMarketingOptionalAgreed(!e.target.checked);
                updateAllAgreed();
              }}
            />
            마케팅 정보 수신에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton onClick={handleNextStep}>다음단계</SubmitButton>
    </Container>
  );
};

export default Agreement;