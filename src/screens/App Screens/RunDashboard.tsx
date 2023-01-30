import Block from '@/components/Block';
import { StatusBar } from 'expo-status-bar';
import useTheme from '@/utils/hooks/context/useTheme';
import Text from '@/components/Text';
import { COLORS } from '@/constants/colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import Modal from '@/components/Modal';
import AddSpeedrunModal from '@/components/AddSpeedrunModal';

type RunDashboardProps = {
  //
};

const RunDashboard = (props: RunDashboardProps) => {
  const { styles, sizes } = useTheme();
  const { getItem, setItem } = useAsyncStorage('userData');

  const [userData, setUserData] = useState(null);

  const [showAddRunModal, setShowAddRunModal] = useState(false);

  const getUserData = async () => {
    const data = await getItem();
    setUserData(data ? JSON.parse(data) : null);
  };
  useEffect(() => {
    getUserData();
  }, []);

  console.log({ userData });

  return (
    <>
      <AddSpeedrunModal
        showModal={showAddRunModal}
        onClose={() => setShowAddRunModal(false)}
        title="Add Speed Run"
        userData={userData}
        revalidateCache={getUserData}
      />
      <Block safe color={COLORS.DARK_BLUE}>
        <Block padding={sizes.sm}>
          <Block
            flex={0}
            marginBottom={sizes.sm}
            row
            align="center"
            justify="space-between"
          >
            <Text size={sizes.s1} bold color="white">
              Run List
            </Text>
            <Block flex={0}>
              <Entypo
                onPress={() => setShowAddRunModal(true)}
                name="plus"
                size={sizes.l}
                color="white"
              />
            </Block>
          </Block>
          <Block>
            {userData ? (
              userData?.map((run: any, index: number) => {
                return (
                  <Block flex={0} marginBottom={sizes.sm}>
                    <GlassCard>
                      <Block flex={0} padding={sizes.sm}>
                        <Text
                          marginBottom={sizes.sm}
                          color="white"
                          size={sizes.s1}
                        >
                          {run.name}
                        </Text>
                        <Text
                          marginBottom={sizes.sm}
                          color="white"
                          size={sizes.s5}
                        >
                          {run.description}
                        </Text>
                      </Block>
                    </GlassCard>
                  </Block>
                );
              })
            ) : (
              <GlassCard>
                <Block flex={0} padding={sizes.padding} align='center'>
                  <Text marginBottom={sizes.sm} color="white" size={sizes.s3}>
                    No Runs Created Yet
                  </Text>
                  <AntDesign name="meh" size={100} color="white" />
                </Block>
              </GlassCard>
            )}
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default RunDashboard;
