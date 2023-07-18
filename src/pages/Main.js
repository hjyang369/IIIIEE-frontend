import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Main = () => {
  const [gatheringDatas, setGatheringData] = useState([]);
  const [storeDatas, setStoreData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleModal = id => {
    setIsOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetch('./data/mainStore.json')
      .then(response => response.json())
      .then(result => setStoreData(result));
  }, []);

  useEffect(() => {
    fetch('./data/mainData.json')
      .then(response => response.json())
      .then(result => setGatheringData(result));
  }, []);

  const goToRegistragion = () => {
    navigate('registration');
  };

  return (
    <Full>
      {storeDatas.map(storeData => {
        return (
          <div key={storeData.storeId}>
            <StoreMain
              title={storeData.storeId}
              onClick={() => {
                handleModal(storeData.storeId);
              }}
            >
              <StoreImg alt="storeImg" src={storeData.storeImg} />
              <StoreName>
                <NameColor>{storeData.storeName}</NameColor>
              </StoreName>
            </StoreMain>
            <Btns>
              <StoreBtn>맛집 정보</StoreBtn>
              <StoreBtn onClick={goToRegistragion}>모임 등록</StoreBtn>
            </Btns>
            {isOpen[storeData.storeId] && (
              <div>
                {gatheringDatas.map(gatheringData => {
                  return (
                    <Lists key={gatheringData.textId}>
                      <p>{gatheringData.title}</p>
                    </Lists>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </Full>
  );
};
export default Main;

const Full = styled.div`
  display: flex;
  flex-direction: column;
  padding: 150px 1em 1em 1em;
`;

const StoreMain = styled.div`
  position: relative;
`;

const StoreImg = styled.img`
  width: 100%;
`;

const StoreBtn = styled.button`
  width: 48%;
  background-color: ${props => props.theme.mainColor};
  border: 0px;
  border-radius: 7px;
  height: 3em;
  color: white;
`;

const StoreName = styled.p`
  background-color: rgba(0, 0, 0, 0.45);
  height: 3em;
  position: absolute;
  top: 78%;
  width: 100%;
  line-height: 3.2em;
`;

const NameColor = styled.p`
  color: white;
  text-align: center;
`;

const Lists = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1em 0em;
`;
