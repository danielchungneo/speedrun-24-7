import Block from '@/components/Block';
import Button from '@/components/Buttons/Button';
import Text from '@/components/Text';
import { COLORS } from '@/constants/colors';
import { msToTime } from '@/utils/data';
import useTheme from '@/utils/hooks/context/useTheme';
import { cloneDeep, runInContext } from 'lodash';
import { useRef, useState } from 'react';
import StopwatchTimer, {
  StopwatchTimerMethods,
} from 'react-native-animated-stopwatch-timer';

const RunTrackerScreen = ({ route }) => {
  const { styles, sizes } = useTheme();

  const selectedRun = route.params;

  const [currentRun, setCurrentRun] = useState(selectedRun);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSplitIndex, setCurrentSplitIndex] = useState(0);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const stopwatchTimerRef = useRef<StopwatchTimerMethods>(null);

  const handleStartRun = () => {
    setIsRunning(true);
    stopwatchTimerRef.current?.play();
  };

  const handlePressSplit = () => {
    const currentTime = stopwatchTimerRef.current?.getSnapshot();
    const currentRunCopy = cloneDeep(currentRun);
    currentRunCopy.splits[currentSplitIndex].time = stopwatchTimerRef.current?.getSnapshot();
    setCurrentRun(currentRunCopy);
    setCurrentSplitIndex(currentSplitIndex + 1);
  };

  const handleFinishRun = () => {
    setIsRunning(false);
    stopwatchTimerRef.current?.pause();
    const currentRunCopy = cloneDeep(currentRun);
    currentRunCopy.time = stopwatchTimerRef.current?.getSnapshot();
    setCurrentRun(currentRunCopy);

    // if (!currentRun?.personalBest || BestcurrentRunCopy.time > currentRun.personalBest) {
    //   setShowCongratsModal(true);
    // } 
  }

  return (

    <Block safe scroll color={COLORS.DARK_BLUE}>
      <Block padding={sizes.s} flex={0} marginBottom={sizes.s}>
        <Text size={sizes.h3} center bold color="white">
          {currentRun.name}
        </Text>
      </Block>
      <Block row color="black" flex={0}>
        <Block
          flex={1}
          paddingVertical={sizes.s}
          paddingHorizontal={sizes.sm}
          style={{ borderRightWidth: 1, borderColor: 'gray' }}
          marginVertical={sizes.s}
        >
          <Text color="white" size={sizes.s5}>
            Split
          </Text>
        </Block>
        <Block
          flex={1}
          align="flex-end"
          paddingVertical={sizes.s}
          paddingHorizontal={sizes.sm}
          marginVertical={sizes.s}
          style={{ borderLeftWidth: 1, borderColor: 'gray' }}
        >
          <Text color="white" size={sizes.s5}>
            Time
          </Text>
        </Block>
      </Block>
      <Block color={COLORS.DARK_GRAY}>
        {currentRun.splits.map((split: any, index: number) => (
          <Block row flex={0} margin={sizes.sm} key={split.id}>
            <Block flex={1}>
              <Text color="white" size={sizes.s5}>
                {split.name}
              </Text>
            </Block>
            <Block flex={1} justify="flex-end" row>
              <Text color="white" bold marginRight={sizes.xl} size={sizes.s5}>
                {split?.timeSave || '---'}
              </Text>
              <Text color="white" bold size={sizes.s5}>
                {msToTime(split?.time) || '---'}
              </Text>
            </Block>
          </Block>
        ))}
      </Block>
      <Block flex={0}>
        <Block row flex={0} padding={sizes.sm}>
          <Block>
            <StopwatchTimer
              separatorStyle={{ fontSize: sizes.h1, color: 'white' }}
              digitStyle={{ fontSize: sizes.h1, color: 'white' }}
              animationDuration={0}
              trailingZeros={2}
              ref={stopwatchTimerRef}
            />
          </Block>
          <Block>
            {!isRunning ? (
              <Button flex={1} color={COLORS.GREEN} onPress={handleStartRun}>
                <Text color="white" bold size={sizes.s3}>
                  Start Run
                </Text>
              </Button>
            ) : isRunning &&
              currentSplitIndex < currentRun.splits.length ? (
              <Button flex={1} color={COLORS.GOLD} onPress={handlePressSplit}>
                <Text color="white" bold size={sizes.s3}>
                  Split
                </Text>
              </Button>
            ) : (
              <Button flex={1} color={COLORS.RED} onPress={handleFinishRun}>
                <Text color="white" bold size={sizes.s3}>
                  Finish Run
                </Text>
              </Button>
            )}
          </Block>
        </Block>
        <Block row flex={0} padding={sizes.sm} justify="center">
          <Block>
            <Text color="white" size={sizes.s4}>
              Personal Best
            </Text>
          </Block>
          <Block align="flex-end">
            <Text color="white" size={sizes.s4}>
              {currentRun?.personalBest || '---'}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default RunTrackerScreen;
