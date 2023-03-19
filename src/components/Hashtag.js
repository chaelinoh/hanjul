import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HASHTAGS1 = [
  ['나', 100],
  ['가족', 101],
  ['친구', 102],
  ['연인', 103],
  ['동료', 104],
  ['고양이', 105],
  ['강아지', 106],
  ['스승', 107],
  ['모두', 108],
  ['자식', 109],
  ['자연', 110],
  ['시간', 111],

];

const HASHTAGS2 = [
  ['기쁨', 100],
  ['슬픔', 101],
  ['화남', 102],
  ['우울', 103],
  ['즐거움', 104],
  ['감동', 105],
  ['사랑', 106],
  ['분노', 107],
  ['희망', 108],
  ['걱정', 109],
  ['기대', 110],
  ['외로움', 111],

];

const HASHTAGS3 = [
  ['인사', 100],
  ['칭찬', 101],
  ['위로', 102],
  ['응원', 103],
  ['명절', 104],
  ['축하', 105],
  ['이별', 106],
  ['졸업', 107],
  ['취업', 108],
  ['연말', 109],
  ['생일', 110],
  ['사랑', 111],

];

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 10px;
  margin-bottom: 10px;
`;

const Span = styled.span`
  width: 90%;
  height: 20px;
  line-height: 20px;
`;

const CheckBoxContainer = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 4px;
  row-gap: 8px;
  flex-wrap: wrap;
`;

const CheckBox = styled.div`
  width: 60px;
  height: 20px;
  line-height: 20px;
  background-color: ${(props) => (props.selected ? '#ed8c15' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#ed8c15')};
  font-size: 12px;
  border: 1px solid #ed8c15;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;



//단일 해시태그 체크박스 렌더링. 자식컴포넌트
const HashtagButton = ({ tag, selectHashtag, hashDefault }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [hashDefault]);

  const onHandleClick = (event) => {
    setSelected(!selected);
    selectHashtag(event.target.innerText);
  };

  return (
    <CheckBox name='hashtag' selected={selected} onClick={onHandleClick}>
      #{tag}
    </CheckBox>
  );
};
//부모컴포넌트
const Hashtag = ({
  selectedHashtagArray,   //선택된 해시태그가 저장되는 배열
  setHashtagsArray,       //함수
  hashDefault,            //boolean
  setHashDefault,         //함수
}) => {
  useEffect(() => {
    if (hashDefault) {
      setHashDefault(false);
    }
  }, [hashDefault]);

  const selectHashtag = (now) => {
    if (selectedHashtagArray.includes(now)) {
      const temp = selectedHashtagArray.filter((tag) => tag !== now);
      setHashtagsArray(temp);
    } else {
      setHashtagsArray([...selectedHashtagArray, now]);
    }
  };


  return (
    <Container style={{ marginBottom: 400, marginLeft: 30 }}>
      <Span>#대상을 고르시오</Span>
      <CheckBoxContainer>
        {HASHTAGS1.map(([tag, id]) => (
          <HashtagButton
            key={id}
            tag={tag}
            selectHashtag={selectHashtag}
            hashDefault={hashDefault}
          />
        ))}
      </CheckBoxContainer>
      <br />
      <br />
      <br />
      <Span>#감정을 고르시오</Span>
      <CheckBoxContainer>
        {HASHTAGS2.map(([tag, id]) => (
          <HashtagButton
            key={id}
            tag={tag}
            selectHashtag={selectHashtag}
            hashDefault={hashDefault}
          />
        ))}
      </CheckBoxContainer>
      <br />
      <br />
      <br />
      <Span>#상황을 고르시오</Span>
      <CheckBoxContainer>
        {HASHTAGS3.map(([tag, id]) => (
          <HashtagButton
            key={id}
            tag={tag}
            selectHashtag={selectHashtag}
            hashDefault={hashDefault}
          />
        ))}
      </CheckBoxContainer>
    </Container>
  );
};

export default Hashtag;

