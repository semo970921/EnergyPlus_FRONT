import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Title, 
  SearchContainer, 
  SearchInput, 
  SearchButton, 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell, 
  RoleToggle, 
  StatusBadge, 
  GradeBadge,
  Pagination, 
  PageButton,
  FilterContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  ResetButton
} from './Member.styles';

const Member = () => {
  // 초기 회원 데이터(임시)
  const initialMembers = [
    { id: 12, email: 'abcd00@naver.com', name: '맹구', joinDate: '2025.05.2', role: '사용자', status: '회원', mileage: 3000 },
    { id: 11, email: 'abcd5@naver.com', name: '철수', joinDate: '2025.05.2', role: '사용자', status: '회원', mileage: 12000 },
    { id: 10, email: 'abcd7@naver.com', name: '훈이', joinDate: '2025.05.1', role: '사용자', status: '탈퇴', mileage: 4500 },
    { id: 9, email: 'abcd98@naver.com', name: '유리', joinDate: '2025.05.1', role: '사용자', status: '탈퇴', mileage: 4500 },
    { id: 8, email: 'abcd1474@naver.com', name: '짱구', joinDate: '2025.04.30', role: '사용자', status: '회원', mileage: 4500 },
    { id: 7, email: 'abcd1747@naver.com', name: '케이에이치', joinDate: '2025.04.29', role: '사용자', status: '회원', mileage: 25000 },
    { id: 6, email: 'aabcd@naver.com', name: '이승철', joinDate: '2025.04.14', role: '사용자', status: '회원', mileage: 18000 },
    { id: 5, email: 'abcd124@naver.com', name: '이은빈', joinDate: '2025.04.14', role: '사용자', status: '회원', mileage: 2500 },
    { id: 4, email: 'abcd2344@naver.com', name: '이성민', joinDate: '2025.04.14', role: '사용자', status: '회원', mileage: 35000 },
    { id: 3, email: 'abcd123@naver.com', name: '김한슬', joinDate: '2025.04.14', role: '관리자', status: '회원', mileage: 28000 },
    { id: 2, email: 'abcd12@naver.com', name: '박진솔', joinDate: '2025.04.11', role: '관리자', status: '회원', mileage: 42000 },
    { id: 1, email: 'abcd1@naver.com', name: '정승원', joinDate: '2025.04.10', role: '관리자', status: '회원', mileage: 15000 },
  ];

  // 마일리지에 따른 등급
  const getGradeByMileage = (mileage) => {
    if (mileage <= 5000) {
      return '새싹';
    } else if (mileage <= 20000) {
      return '나무';
    } else if (mileage <= 30000) {
      return '숲';
    } else {
      return '지구';
    }
  };

  // 상태 관리
  const [members, setMembers] = useState(initialMembers);
  const [searchMember, setSearchMember] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    dateRange: '',
    grade: '',
    status: '',
    role: ''
  });



  // 필터 변경 함수
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // 필터 적용 함수
  const applyFilters = () => {
    let filteredResult = [...initialMembers];
    
    // 검색어 필터링
    if (searchMember.trim()) {
      filteredResult = filteredResult.filter(member => 
        member.name.includes(searchMember) || 
        member.email.includes(searchMember)
      );
    }
    
    // 역할 필터링
    if (filters.role) {
      filteredResult = filteredResult.filter(member => member.role === filters.role);
    }
    
    // 상태(탈퇴 여부) 필터링
    if (filters.status) {
      filteredResult = filteredResult.filter(member => member.status === filters.status);
    }
    
    // 등급 필터링
    if (filters.grade) {
      if (filters.grade === '관리자제외') { // 관리자 제외 옵션
        filteredResult = filteredResult.filter(member => member.role !== '관리자');
      } else {
        // 특정 등급만
        filteredResult = filteredResult.filter(member => 
          member.role !== '관리자' && getGradeByMileage(member.mileage) === filters.grade
        );
      }
    }
    
    // 가입일 필터링
    if (filters.dateRange) {
      const today = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case '1주일':
          startDate = new Date(today.setDate(today.getDate() - 7));
          break;
        case '1개월':
          startDate = new Date(today.setMonth(today.getMonth() - 1));
          break;
        case '3개월':
          startDate = new Date(today.setMonth(today.getMonth() - 3));
          break;
        case '6개월':
          startDate = new Date(today.setMonth(today.getMonth() - 6));
          break;
        case '1년':
          startDate = new Date(today.setFullYear(today.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        filteredResult = filteredResult.filter(member => {
          const memberDate = new Date(member.joinDate.replace(/\./g, '-'));
          return memberDate >= startDate;
        });
      }
    }
    
    setMembers(filteredResult);
    setCurrentPage(1); // 필터 적용 시 첫 페이지로 이동
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({dateRange: '', grade: '', status: '', role: ''});
    setSearchMember('');
    setMembers(initialMembers);
    setCurrentPage(1);
  };

  // Role토글 처리 함수
  const handleRoleToggle = (id) => {
    setMembers(
      members.map((member) => {
        if (member.id === id) {
          const newRole = member.role === '사용자' ? '관리자' : '사용자';
          return { ...member, role: newRole };
        }
        return member;
      })
    );
  };

  // 페이지네이션 설정
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(members.length / itemsPerPage);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToFirstPage = () => setCurrentPage(1);

  const goToLastPage = () => setCurrentPage(totalPages);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // 필터 변경시 필터 적용
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <Container>
      <Title>회원관리</Title>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="검색"
          value={searchMember}
          onChange={(e) => setSearchMember(e.target.value)}
        />
        <SearchButton onClick={applyFilters}>검색</SearchButton>
      </SearchContainer>
      
      <FilterContainer>
        <FilterGroup>
          <FilterLabel>가입일</FilterLabel>
          <FilterSelect 
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            <option value="1주일">1주일 이내</option>
            <option value="1개월">1개월 이내</option>
            <option value="3개월">3개월 이내</option>
            <option value="6개월">6개월 이내</option>
            <option value="1년">1년 이내</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>등급</FilterLabel>
          <FilterSelect 
            name="grade"
            value={filters.grade}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            <option value="관리자제외">일반 회원만</option>
            <option value="새싹">새싹</option>
            <option value="나무">나무</option>
            <option value="숲">숲</option>
            <option value="지구">지구</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>상태</FilterLabel>
          <FilterSelect 
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            <option value="회원">회원</option>
            <option value="탈퇴">탈퇴</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>역할</FilterLabel>
          <FilterSelect 
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            <option value="사용자">사용자</option>
            <option value="관리자">관리자</option>
          </FilterSelect>
        </FilterGroup>
        
        <ResetButton onClick={resetFilters}>
          필터 초기화
        </ResetButton>
      </FilterContainer>
      
      <Table>
        <thead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>아이디</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>가입일</TableHeader>
            <TableHeader>역할</TableHeader>
            <TableHeader>등급</TableHeader>
            <TableHeader>탈퇴</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentItems.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.id}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.joinDate}</TableCell>
              <TableCell>
                <RoleToggle 
                  onClick={() => handleRoleToggle(member.id)}
                  role={member.role}
                >
                  {member.role}
                </RoleToggle>
              </TableCell>
              <TableCell>
                {member.role === '관리자' ? (
                  <span>-</span>
                ) : (
                  <GradeBadge grade={getGradeByMileage(member.mileage)}>
                    {getGradeByMileage(member.mileage)} ({member.mileage.toLocaleString()}원)
                  </GradeBadge>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={member.status}>{member.status}</StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      
      <Pagination>
        <PageButton onClick={goToFirstPage}>&laquo;</PageButton>
        <PageButton onClick={goToPreviousPage}>&lt;</PageButton>
        {[...Array(totalPages).keys()].map((number) => (
          <PageButton
            key={number + 1}
            onClick={() => paginate(number + 1)}
            active={currentPage === number + 1}
          >
            {number + 1}
          </PageButton>
        ))}
        <PageButton onClick={goToNextPage}>&gt;</PageButton>
        <PageButton onClick={goToLastPage}>&raquo;</PageButton>
      </Pagination>
    </Container>
  );
};

export default Member;