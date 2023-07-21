import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Slide from '../components/Slide/Slide';
import useFetch from '../hooks/useFetch';

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState();
  const navigate = useNavigate();

  const { getData: storeDatas } = useFetch('/data/mainStore.json');
  const { getData: gatheringDatas } = useFetch('/data/mainData.json');

  //TODO
  // const { getData: restaurantDatas } = useFetch(
  //   `http://${process.env.REACT_APP_IP}/restaurants/restaurantList`,
  // );
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://10.58.52.153:3000/restaurants/restaurantList`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       const result = await response.json();
  //       if (Array.isArray(result.data)) {
  //         setRestaurantList(result.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  const handleModal = id => {
    setIsOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const goToLink = url => {
    navigate(url);
  };

  return (
    <Full>
      TODO
      {/* {restaurantList?.data?.map((storeData, idx) => {
        return (
          <div key={storeData.restaurantId}>
            <StoreMain
              title={storeData.restaurantId}
              onClick={() => {
                handleModal(storeData.restaurantId);
              }}
            >
              <SlideStyle RestaurantInfoData={restaurantList[idx]} />
              <StoreName>
                <NameColor>{storeData.restaurantName}</NameColor>
              </StoreName>
            </StoreMain>
            <Btns>
              <StoreBtn onClick={() => goToLink('restaurantInfo')}>
                맛집 정보
              </StoreBtn>
              <StoreBtn onClick={() => goToLink('registration')}>
                모임 등록
              </StoreBtn>
            </Btns>
            {isOpen[storeData.restaurantId] && (
              <div>
                {restaurantList?.data?.roomsData?.map(gatheringData => {
                  return (
                    <Lists key={gatheringData.roomsId}>
                      <p onClick={() => goToLink('gathering')}>
                        {gatheringData.roomsTitle}
                      </p>
                    </Lists>
                  );
                })}
              </div>
            )}
          </div>
        );
      })} */}
      {storeDatas?.map((storeData, idx) => {
        return (
          <div key={storeData.storeId}>
            <StoreMain
              title={storeData.storeId}
              onClick={() => {
                handleModal(storeData.storeId);
              }}
            >
              <SlideStyle RestaurantInfoData={storeDatas[idx]} />
              <StoreName>
                <NameColor>{storeData.storeName}</NameColor>
              </StoreName>
            </StoreMain>
            <Btns>
              <StoreBtn onClick={() => goToLink('restaurantInfo')}>
                맛집 정보
              </StoreBtn>
              <StoreBtn onClick={() => goToLink('registration')}>
                모임 등록
              </StoreBtn>
            </Btns>
            {isOpen[storeData.storeId] && (
              <div>
                {gatheringDatas?.map(gatheringData => {
                  return (
                    <Lists key={gatheringData.textId}>
                      <p onClick={() => goToLink('gathering')}>
                        {gatheringData.title}
                      </p>
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
  padding: 130px 1em 1em 1em;
`;

const StoreMain = styled.div`
  position: relative;
`;

const SlideStyle = styled(Slide)`
  position: relative;
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
  bottom: 1%;
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
