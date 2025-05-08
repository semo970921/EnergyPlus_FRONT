import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FormContainer,
    FormTitle,
    FormContent,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    CheckButton,
    FormFooter,
    SubmitButton,
    CancelButton,
    HelpButtonWrapper,
    HelpButton,
    ErrorMessage,
    SuccessMessage
} from "./SignupForm.style";
import axios from "axios";

// API 기본 URL 설정
const API_BASE_URL = "http://localhost:80"; // 백엔드 서버 주소에 맞게 수정

const SignupForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        emailCode: '',
        userPassword: '',
        passwordConfirm: '',
        userPhone: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [emailVerified, setEmailVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSending, setEmailSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    
    // 약관 동의 정보 상태 추가
    const [agreementInfo, setAgreementInfo] = useState(null);
    
    // 컴포넌트 마운트 시 세션스토리지에서 약관 동의 정보 로드
    useEffect(() => {
        const savedAgreementInfo = sessionStorage.getItem("agreementInfo");
        if (savedAgreementInfo) {
            setAgreementInfo(JSON.parse(savedAgreementInfo));
        } else {
            // 약관 동의 정보가 없으면 약관 페이지로 리다이렉트
            navigate("/agreement");
        }
    }, [navigate]);
    
    // 폼 검증 함수
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.userName || formData.userName.length < 2 || formData.userName.length > 10) {
            newErrors.userName = "이름은 2글자 이상 10글자 이하로 입력해주세요.";
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!formData.userEmail || !emailRegex.test(formData.userEmail)) {
            newErrors.userEmail = "유효한 이메일을 입력해주세요.";
            isValid = false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@._^])[A-Za-z\d!@._^]{8,20}$/;
        if (!formData.userPassword || !passwordRegex.test(formData.userPassword)) {
            newErrors.userPassword = "비밀번호는 8~20자, 영문 대소문자, 숫자, 특수문자(!, @, ., _, ^)를 각각 하나 이상 포함해야 합니다.";
            isValid = false;
        }

        if (formData.userPassword !== formData.passwordConfirm) {
            newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
            isValid = false;
        }

        if (formData.userPhone && !/^\d{11}$/.test(formData.userPhone)) {
            newErrors.userPhone = "전화번호는 11자리 숫자만 입력해주세요.";
            isValid = false;
        }

        if (!emailVerified) {
            newErrors.emailCode = "이메일 인증이 필요합니다.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        
        // 입력값이 변경되면 해당 필드의 오류 메시지 초기화
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // 이메일이 변경되면 인증 상태 초기화
        if (name === 'userEmail') {
            setEmailVerified(false);
            setSuccess(prev => ({
                ...prev,
                emailVerified: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            const firstErrorField = Object.keys(errors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) errorElement.focus();
            return;
        }
        
        // 약관 동의 정보가 없으면 처리 중단
        if (!agreementInfo) {
            setErrors(prev => ({
                ...prev,
                general: "약관 동의가 필요합니다. 약관 동의 페이지로 이동합니다."
            }));
            setTimeout(() => {
                navigate("/agreement");
            }, 2000);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // 약관 동의 정보 매핑
            const agreementData = {
                termsOfUseAgreed: agreementInfo.privacyThirdPartyAgreed && agreementInfo.privacyRequiredAgreed,
                privacyPolicyAgreed: agreementInfo.personalInfoAgreed && agreementInfo.personalInfoRequiredAgreed,
                marketingAgreed: agreementInfo.marketingAgreed && agreementInfo.marketingOptionalAgreed
            };
            
            // 회원가입 API 호출
            const response = await axios.post(`${API_BASE_URL}/members`, {
                userName: formData.userName,
                userEmail: formData.userEmail,
                userPassword: formData.userPassword,
                userPhone: formData.userPhone || null,
                gradeId: 1, // 기본 등급 아이디 설정
                agreementInfo: agreementData
            });
            
            if (response.status === 201) {
                alert("회원가입이 완료되었습니다!");
                
                // 세션에서 약관 동의 정보 제거
                sessionStorage.removeItem("agreementInfo");

                // 인증된 이메일 목록에서 제거하는 API 호출
                try {
                    await axios.post(`${API_BASE_URL}/api/verification/check-status`, {
                        email: formData.userEmail
                    });
                } catch (error) {
                    console.error("인증 상태 확인 실패:", error);
                }
                
                // 폼 초기화 
                setFormData({
                    userName: '',
                    userEmail: '',
                    emailCode: '',
                    userPassword: '',
                    passwordConfirm: '',
                    userPhone: ''
                });
                setEmailVerified(false);
                setSuccess({});
                
                // 로그인 페이지로 이동
                navigate("/login");
            }
        } catch (error) {
            // 에러 처리
            console.error("회원가입 실패:", error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // 이메일 인증코드 발송
    const sendEmailCode = async () => {
        // 이메일 유효성 검사
        const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!formData.userEmail) {
            setErrors(prev => ({
                ...prev,
                userEmail: "이메일을 먼저 입력해주세요."
            }));
            return;
        }
        
        if (!emailRegex.test(formData.userEmail)) {
            setErrors(prev => ({
                ...prev,
                userEmail: "유효한 이메일 형식이 아닙니다."
            }));
            return;
        }
        
        setEmailSending(true);
        setErrors(prev => ({ ...prev, userEmail: '' }));
        
        try {
            // 이메일 인증 코드 발송 API 호출
            const response = await axios.post(`${API_BASE_URL}/api/verification/send-code`, {
                email: formData.userEmail
            });
            
            if (response.status === 200) {
                setSuccess(prev => ({
                    ...prev,
                    emailCode: "인증번호가 이메일로 발송되었습니다. 이메일을 확인해주세요."
                }));
            }
        } catch (error) {
            console.error("인증 코드 발송 실패:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(prev => ({
                    ...prev,
                    userEmail: error.response.data.error
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    userEmail: "인증 코드 발송에 실패했습니다. 다시 시도해주세요."
                }));
            }
        } finally {
            setEmailSending(false);
        }
    };

    // 이메일 인증코드 확인
    const verifyEmailCode = async () => {
        if (!formData.emailCode) {
            setErrors(prev => ({
                ...prev,
                emailCode: "인증코드를 입력해주세요."
            }));
            return;
        }
        
        setVerifying(true);
        setErrors(prev => ({ ...prev, emailCode: '' }));
        
        try {
            // 이메일 인증 코드 확인 API 호출
            const response = await axios.post(`${API_BASE_URL}/api/verification/verify-code`, {
                email: formData.userEmail,
                code: formData.emailCode
            });
            
            if (response.status === 200) {
                setEmailVerified(true);
                setSuccess(prev => ({
                    ...prev,
                    emailVerified: "이메일 인증이 완료되었습니다."
                }));
            }
        } catch (error) {
            console.error("인증 코드 확인 실패:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(prev => ({
                    ...prev,
                    emailCode: error.response.data.error
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    emailCode: "인증 코드 확인에 실패했습니다. 다시 시도해주세요."
                }));
            }
        } finally {
            setVerifying(false);
        }
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm("회원가입을 취소하시겠습니까?");
        if (confirmCancel) {
            // 세션 스토리지의 약관 동의 정보 삭제
            sessionStorage.removeItem("agreementInfo");
            // 메인 페이지로 이동
            navigate("/");
        }
    };

    return (
        <FormContainer>
            <FormTitle>회원가입</FormTitle>
            <FormContent onSubmit={handleSubmit}>
                
                {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
                
                <FormGroup>
                    <Label>이름</Label>
                    <Input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        placeholder="2~10자 이내로 입력해주세요"
                    />
                    {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label>비밀번호</Label>
                    <Input
                        type="password"
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={handleChange}
                        required
                        placeholder="영문 대/소문자, 숫자, 특수문자 포함 8~20자"
                    />
                    {errors.userPassword && <ErrorMessage>{errors.userPassword}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label>이메일</Label>
                    <ButtonGroup>
                        <Input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                            placeholder="이메일 주소"
                            disabled={emailVerified}
                        />
                        <CheckButton 
                            type="button" 
                            onClick={sendEmailCode}
                            disabled={emailSending || emailVerified || !formData.userEmail}
                        >
                            {emailSending ? '발송중...' : '인증코드 받기'}
                        </CheckButton>
                    </ButtonGroup>
                    {errors.userEmail && <ErrorMessage>{errors.userEmail}</ErrorMessage>}
                    {success.emailCode && <SuccessMessage>{success.emailCode}</SuccessMessage>}
                </FormGroup>

                <FormGroup>
                    <Label>비밀번호 확인</Label>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        required
                        placeholder="비밀번호를 한번 더 입력해주세요"
                    />
                    {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label>이메일 인증코드</Label>
                    <ButtonGroup>
                        <Input
                            type="text"
                            name="emailCode"
                            value={formData.emailCode}
                            onChange={handleChange}
                            required
                            placeholder="이메일로 받은 인증번호 입력"
                            disabled={emailVerified || !success.emailCode}
                        />
                        <CheckButton 
                            type="button" 
                            onClick={verifyEmailCode}
                            disabled={verifying || emailVerified || !formData.emailCode}
                        >
                            {verifying ? '확인중...' : '인증코드 확인'}
                        </CheckButton>
                    </ButtonGroup>
                    {errors.emailCode && <ErrorMessage>{errors.emailCode}</ErrorMessage>}
                    {success.emailVerified && <SuccessMessage>{success.emailVerified}</SuccessMessage>}
                </FormGroup>

                <FormGroup>
                    <Label>전화번호 (선택)</Label>
                    <Input
                        type="tel"
                        name="userPhone"
                        value={formData.userPhone}
                        onChange={handleChange}
                        placeholder="'-' 없이 숫자만 입력 (예: 01012345678)"
                    />
                    {errors.userPhone && <ErrorMessage>{errors.userPhone}</ErrorMessage>}
                </FormGroup>

                <FormFooter>
                    <SubmitButton 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '처리중...' : '회원가입'}
                    </SubmitButton>
                    <CancelButton 
                        type="button" 
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        취소하기
                    </CancelButton>
                </FormFooter>

            </FormContent>
            <HelpButtonWrapper>
                <HelpButton onClick={() => alert("회원가입에 문제가 있으신가요?\n이메일: info@energyplus.kr\n전화: 02-123-4567")}>도움</HelpButton>
            </HelpButtonWrapper>
        </FormContainer>
    );
};

export default SignupForm;