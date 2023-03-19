import styled from 'styled-components';

const Container = styled.div`
  width: 630px;
  height: 90vh;
  overflow: auto;
  background-color: #f5f6fa;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 10px 0px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 870px) {
    width: 500px;
    height: 90vh;
  }
`;

const ListForm = styled.div`
  width: 90%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  width: 85%;
  height: 250px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const TextContainer = styled.div`
  width: 85%;
  height: fit-content;
  max-height: 150px;
  text-align: center;
  padding: 6px;
  margin: 5px 0px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
  padding: 4px 0px;
  padding-left: 10px;
  border-bottom: 1px solid #eeeeee;
`;

const ProfileImgContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #ef9a9a;
`;

const SocialBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px 10px 40px;
`;

const HashtagsContainer = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const Hashtags = styled.div`
  width: 54px;
  height: 20px;
  line-height: 200%;
  font-size: 11px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #ef9a9a;
  color: #fff;
`;

const LikesContainer = styled.div`
  width: 20%;
  height: 30px;
  line-height: 200%;
  display: felx;
  color: #616161;
  justify-content: flex-end;
  align-items: center;
`;

const LikeButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: #c62828;
`;

const SearchBarContainer = styled.div`
  width: 90%;
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

const SearchBarInput = styled.input`
  width: 85%;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #999;
`;

const SpanName = styled.span`
  font-size: 14px;
`;

const SpanEmail = styled.span`
  font-size: 11px;
  color: #8395a7;
`;

export {
  ProfileContainer,
  ProfileImgContainer,
  TextContainer,
  ListForm,
  Container,
  ImageContainer,
  LikeButton,
  SocialBox,
  Hashtags,
  HashtagsContainer,
  LikesContainer,
  SearchBarInput,
  SearchButton,
  SearchBarContainer,
  SpanName,
  SpanEmail,
};