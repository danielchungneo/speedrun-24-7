import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import GlassCard from '@/components/GlassCard';
import Text from '@/components/Text';
import { COLORS } from '@/constants/colors';
import useTheme from '@/utils/hooks/context/useTheme';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { runInContext } from 'lodash';
import AddSpeedrunModal from '@/components/AddSpeedrunModal';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Pressable } from 'react-native';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddSplitModal from '@/components/AddSplitModal';
import SCREENS from '@/constants/screens';

const RunDetailsScreen = ({ route }) => {
  const { styles, sizes } = useTheme();
  const { getItem, setItem } = useAsyncStorage('userData');
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  const [showAddRunModal, setShowAddRunModal] = useState(false);
  const [showAddSplitModal, setShowAddSplitModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getUserData = async () => {
    const data = await getItem();
    setUserData(data ? JSON.parse(data) : null);
  };
  useEffect(() => {
    getUserData();
  }, []);

  const selectedRun = userData?.find((run: any) => run.id === route.params.id);

  console.log(selectedRun);

  const handleEditSpeedrun = () => {
    setShowAddRunModal(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onDeleteSpeedRunSuccess = () => {
    handleGoBack();
    getUserData();
  };

  const handleDeleteSpeedrun = () => {
    const resultData = userData.filter((run: any) => run.id !== selectedRun.id);
    setItem(JSON.stringify(resultData));
  };

  const handleNavigateToTrackingScreen = () => {
    navigation.navigate(SCREENS.RUN_TRACKING, selectedRun);
  };

  return (
    <>
      {selectedRun ? (
        <>
          <ConfirmationModal
            onCancellation={() => setShowDeleteModal(false)}
            onSuccess={onDeleteSpeedRunSuccess}
            showModal={showDeleteModal}
            onConfirmation={handleDeleteSpeedrun}
          />
          <AddSpeedrunModal
            showModal={showAddRunModal}
            onClose={() => setShowAddRunModal(false)}
            title="Edit Speedrun"
            userData={userData}
            revalidateCache={getUserData}
            speedRun={selectedRun}
          />
          <AddSplitModal
            showModal={showAddSplitModal}
            onClose={() => setShowAddSplitModal(false)}
            revalidateCache={getUserData}
            userData={userData}
            selectedRun={selectedRun}
          />
          <Block safe scroll color={COLORS.DARK_BLUE}>
            <Block padding={sizes.sm}>
              <Block
                flex={0}
                marginBottom={sizes.sm}
                row
                align="center"
                justify="space-between"
              >
                <Block row flex={0} align="center">
                  <Entypo
                    name="chevron-left"
                    size={sizes.l}
                    color="white"
                    onPress={handleGoBack}
                  />
                  <Text size={sizes.s1} bold color="white">
                    {selectedRun.name}
                  </Text>
                </Block>
                <Block flex={0}>
                  <AntDesign
                    onPress={handleEditSpeedrun}
                    name="edit"
                    size={sizes.l}
                    color="white"
                  />
                </Block>
              </Block>
              <Block>
                <Block flex={0} marginBottom={sizes.sm}>
                  <GlassCard>
                    <Block flex={0} padding={sizes.sm}>
                      <Text center size={sizes.s1} bold color="white">
                        Personal Best:
                      </Text>
                      <Text center color={COLORS.GOLD} size={sizes.h1} bold>
                        {selectedRun?.personalBest || '---'}
                      </Text>
                    </Block>
                  </GlassCard>
                </Block>
                <Block flex={0} margin>
                  <GlassCard>
                    <Block
                      flex={0}
                      padding={sizes.sm}
                      row
                      justify="space-between"
                    >
                      <Text size={sizes.s1} bold color="white">
                        Splits
                      </Text>
                      <Entypo
                        name="plus"
                        size={sizes.l}
                        color="white"
                        onPress={() => setShowAddSplitModal(true)}
                      />
                    </Block>
                    {selectedRun?.splits?.map((split: any, index: number) => (
                      <Block
                        flex={0}
                        padding={sizes.sm}
                        row
                        align="center"
                        justify="space-between"
                        key={split.id}
                        color={
                          index % 2 === 0 ? COLORS.BLACK : COLORS.DARK_GRAY
                        }
                      >
                        <Text size={sizes.s4} color="white">
                          {split.name}
                        </Text>
                        <Text size={sizes.s4} color="white">
                          {split?.personalBest || '---'}
                        </Text>
                      </Block>
                    ))}
                  </GlassCard>
                </Block>
              </Block>
            </Block>
            <Block
              style={{
                backgroundColor: 'black',
                height: 65,
                width: 65,
                borderRadius: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: sizes.sm,
                left: sizes.sm,
                borderWidth: 3,
              }}
            >
              <Pressable onPress={handleGoBack}>
                <FontAwesome5
                  onPress={() => setShowDeleteModal(true)}
                  name="trash"
                  size={24}
                  color={COLORS.RED}
                />
              </Pressable>
            </Block>
            <Block
              style={{
                backgroundColor: 'black',
                height: 65,
                width: 65,
                borderRadius: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: sizes.sm,
                right: sizes.sm,
                borderWidth: 3,
              }}
            >
              <Button onPress={handleNavigateToTrackingScreen}>
                <FontAwesome5 name="play" size={24} color={COLORS.GREEN} />
              </Button>
            </Block>
          </Block>
        </>
      ) : (
        <Block>
          <ActivityIndicator color={'white'} />
        </Block>
      )}
    </>
  );
};

export default RunDetailsScreen;
