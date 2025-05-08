import React, { useState } from "react";
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
  ScrollContainer
} from "./Agreement.style";

const Agreement = () => {
  // 체크박스 상태 관리
  const [privacyThirdPartyAgreed, setPrivacyThirdPartyAgreed] = useState(false);
  const [privacyRequiredAgreed, setPrivacyRequiredAgreed] = useState(false);
  const [creditInfoAgreed, setCreditInfoAgreed] = useState(false);
  const [creditInfoOptionalAgreed, setCreditInfoOptionalAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [marketingOptionalAgreed, setMarketingOptionalAgreed] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);

  // 전체 동의 처리
  const handleAllAgreed = (e) => {
    const checked = e.target.checked;
    setAllAgreed(checked);
    setPrivacyThirdPartyAgreed(checked);
    setPrivacyRequiredAgreed(checked);
    setCreditInfoAgreed(checked);
    setCreditInfoOptionalAgreed(checked);
    setMarketingAgreed(checked);
    setMarketingOptionalAgreed(checked);
  };

  // 개별 체크박스 변경 시 전체 동의 상태 업데이트
  const updateAllAgreed = () => {
    if (
      privacyThirdPartyAgreed &&
      privacyRequiredAgreed &&
      creditInfoAgreed &&
      creditInfoOptionalAgreed &&
      marketingAgreed &&
      marketingOptionalAgreed
    ) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
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

      {/* 1. 개인정보의 제3자 제공 및 취급 위탁에 동의 */}
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
            (필수) 개인정보의 제3자 제공 및 취급 위탁에 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;개인정보보호법 제3자 제공 및 취급 위탁 동의&gt;
            <br />
            회사(에코로그(이하,회사))는 개인정보이용자들의 개인정보를 매우 중요시하며 「개인정보보호법」및「정보통신망 이용촉진 및 개인정보보호에 관한 법률」을 준수하고있습니다. 회사는 개인정보처리방침을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치를 취하고 있는지 알려드리고자 합니다.
            <br /><br />
            &lt;탄소중립포인트(에너지 포인트) 제도 인센티브 제공 서비스 제공을 위해 개인정보를 처리하고있는 기관&gt;
            이용자가 제공하는 회원가입을 위한 정보 및 각 탄소중립포인트(에너지 포인트) 관련 인센티브 신청 자료 내역 개인정보에 대해 수집/이용, 업무처리에 필요 범위에서 위탁처리 업무수탁자에게 아래와 같은 개인정보를 처리하고있습니다.
          </ContentText>
          
          <Table>
            <thead>
              <tr>
                <TableHeader>제공받는 자</TableHeader>
                <TableHeader>제공받는 자의 이용목적</TableHeader>
                <TableHeader>제공하는 개인정보 항목</TableHeader>
                <TableHeader>제공받는 자의 개인정보 보유 및 이용기간</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>한국환경공단, 환경부</TableCell>
                <TableCell>회원가입 및 서비스 이용</TableCell>
                <TableCell>성명, 전화번호/휴대폰, 이메일/아이디(ID)</TableCell>
                <TableCell>회원 탈퇴 시까지</TableCell>
              </tr>
            </tbody>
          </Table>
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
            개인정보의 제3자 제공 및 취급 위탁에 동의합니다.
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
            개인정보의 제3자 제공 및 취급 위탁에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      {/* 2. 고유식별정보 처리에 동의 */}
      <Section>
        <SectionTitle>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={creditInfoAgreed}
              onChange={(e) => {
                setCreditInfoAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            (필수) 고유식별정보 처리에 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;고유식별번호에 대한 처리 동의서&gt;
            <br />
            에코로그는 아래와 같이 귀하의 정보주체의 동의 내지 법률에 특별한 규정이 있는 경우에만 고유식별정보를 처리하고 있습니다.
            <br /><br />
            &lt;탄소중립포인트(에너지 포인트) 제도 인센티브 제공 신청 및 접수를 위해 고유식별번호(주민등록번호)&gt;
            회원 가입 및 접수를 위해 수집 이용 신청서에 대하여 고지하고있으며, 업무처리에 필요 범위에서 이용하고 있습니다.
          </ContentText>
          
          <Table>
            <thead>
              <tr>
                <TableHeader>수집하는 개인정보의 항목</TableHeader>
                <TableHeader>개인정보의 수집 이용목적</TableHeader>
                <TableHeader>개인정보의 보유 및 이용기간</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>고유식별번호(주민등록번호)</TableCell>
                <TableCell>
                  - 본인확인(아이핀/주민등록증) 실명 인증(환경부/행정망 이용)
                  <br />
                  - 만14세이하 이용자의 개인정보 수집시 법정대리인(부모/후견인)의 동의
                </TableCell>
                <TableCell>회원 탈퇴 및 파기 요청시까지</TableCell>
              </tr>
            </tbody>
          </Table>
        </ScrollContainer>

        <AgreementContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={creditInfoOptionalAgreed}
              onChange={(e) => {
                setCreditInfoOptionalAgreed(e.target.checked);
                updateAllAgreed();
              }}
            />
            고유식별정보 처리에 동의합니다.
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={!creditInfoOptionalAgreed}
              onChange={(e) => {
                setCreditInfoOptionalAgreed(!e.target.checked);
                updateAllAgreed();
              }}
            />
            고유식별정보 처리에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      {/* 3. 선택사항에 동의 */}
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
            (선택) 선택사항에 동의
          </CheckboxLabel>
        </SectionTitle>

        <ScrollContainer>
          <ContentText>
            &lt;선택사항 동의&gt;
            <br />
            개인정보보호법 제22조 제4항에 의해 선택정보의 수집/이용 동의가 가능합니다. 서비스 질을 높이기 위해서만 수집됩니다.
            <br />
            &lt;마케팅/홍보(에너지 포인트)에서 활용하기 위한 개인정보활용 수집 / 이용안내&gt;
            <br />
            - 신규서비스
            <br />
            - 이벤트정보 안내
            <br />
            선택/수집 항목에서 동의한 정보가 변경되었거나 함께합니다.
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
            선택사항에 동의합니다.
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
            선택사항에 미동의합니다.
          </CheckboxLabel>
        </AgreementContainer>
      </Section>

      <SubmitButton>다음단계</SubmitButton>
    </Container>
  );
};

export default Agreement;