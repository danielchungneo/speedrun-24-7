import React, { useState } from 'react';
import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import Block from '@/components/Block';
import Text from '@/components/Text';
import { Feather } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  PieChart,
  LineChart,
  BarChart,
  XAxis,
  AreaChart,
  Grid,
} from 'react-native-svg-charts';
import { Text as SvgText, G, Line, Circle, Rect } from 'react-native-svg';
import * as scale from 'd3-scale';
import 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useHeaderHeight } from '@react-navigation/elements';

const BarChartLabels = ({ x, y, bandwidth, data, width, height, ticks }) => {
  return data.map((item, index) => {
    const value = item?.value;
    const xPosition = x(index) + bandwidth / 2;
    const yValue = y(value);
    const barHeight = 200 - yValue;
    const yPosition =
      barHeight < 65 ? yValue - 10 : yValue + barHeight / 2 - 13;

    return (
      <SvgText
        key={index}
        x={xPosition}
        y={yPosition}
        fontSize={18}
        fontWeight='bold'
        fill={'black'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
      >
        {value}
      </SvgText>
    );
  });
};

const PieChartLabels = ({ slices, height, width }) => {
  const { colors } = useTheme();

  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;

    return (
      <SvgText
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill={colors.black}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={18}
        fontWeight='bold'
        strokeWidth={0.2}
      >
        {data.count}
      </SvgText>
    );
  });
};

const PieChartLabelsOffChart = ({ slices }) => {
  const { colors } = useTheme();

  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;

    const { name } = data;
    const rectWidth = name.length * 8;
    const rectHeight = 15;

    return (
      <G key={index}>
        <SvgText
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={colors.black}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={18}
          fontWeight='bold'
          strokeWidth={0.2}
        >
          {data.count}
        </SvgText>
      </G>
    );
  });
};

const DashboardScreen = () => {
  const { t } = useTranslation();
  const { styles, assets, colors, fonts, gradients, sizes } = useTheme();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const pieChartData = useMemo(
    () =>
      [
        {
          key: 1,
          name: 'Closed',
          count: 12,
          svg: {
            fill: colors.primary,
          },
        },
        {
          key: 3,
          name: 'In Progress',
          count: 7,
          svg: {
            fill: colors.warning,
          },
        },
        {
          key: 2,
          name: 'Open',
          count: 5,
          arc: { outerRadius: '115%' },
          svg: {
            fill: colors.success,
          },
        },
      ].map((d, index) => ({
        ...d,
        key: `pie-${index}`,
        arc: { ...(d.arc || {}), cornerRadius: 6 },
      })),
    []
  );

  const barChartData = useMemo(() => {
    return [
      {
        value: 1,
        label: 'Aug.',
      },
      {
        value: 2,
        label: 'Sept.',
      },
      {
        value: 3,
        label: 'Oct.',
      },
      {
        value: 4,
        label: 'Nov.',
      },
      {
        value: 8,
        label: 'Dec.',
      },
    ];
  }, []);

  return (
    <>
      <StatusBar style='light' />

      <Block
        scroll
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: sizes.l,
        }}
      >
        <Block
          position='absolute'
          top={0}
          left={0}
          height={sizes.height / 2 + headerHeight}
          gradient={[String(colors.primary), String(colors.background)]}
          start={[0, 0]}
          end={[0, 1]}
          width={sizes.width}
        />

        <Block padding={sizes.padding}>
          <Text size='h4' variant='white'>
            This Month
          </Text>

          <Block
            flex={0}
            card
            row
            paddingHorizontal={sizes.m}
            marginTop={sizes.sm}
          >
            <Block>
              <Text size='h5' bold variant='secondary'>
                Open
              </Text>
              <Text size='h3'>5</Text>
            </Block>
            <Block flex={0}>
              <Block
                height={sizes.xl}
                width={sizes.xl}
                radius={sizes.xl}
                variant='success'
                flex={0}
                justify='center'
                align='center'
              >
                <Feather name='phone' size={sizes.m} color={colors.white} />
              </Block>
            </Block>
          </Block>

          <Block
            flex={0}
            card
            row
            marginTop={sizes.m}
            paddingHorizontal={sizes.m}
          >
            <Block>
              <Text size='h5' bold variant='secondary'>
                Closed
              </Text>
              <Text size='h3'>12</Text>
            </Block>
            <Block flex={0}>
              <Block
                height={sizes.xl}
                width={sizes.xl}
                radius={sizes.xl}
                variant='primary'
                flex={0}
                justify='center'
                align='center'
              >
                <Feather name='briefcase' size={sizes.m} color={colors.white} />
              </Block>
            </Block>
          </Block>

          <Block
            flex={0}
            card
            row
            marginTop={sizes.m}
            paddingHorizontal={sizes.m}
          >
            <Block>
              <Text size='p' bold variant='secondary'>
                In Progress
              </Text>
              <Text size='h3'>7</Text>
            </Block>
            <Block flex={0}>
              <Block
                height={sizes.xl}
                width={sizes.xl}
                radius={sizes.xl}
                variant='warning'
                flex={0}
                justify='center'
                align='center'
              >
                <Feather name='clock' size={sizes.m} color={colors.white} />
              </Block>
            </Block>
          </Block>

          <Block flex={0} card marginTop={sizes.m} paddingHorizontal={sizes.m}>
            <Text size='h4' variant='secondary'>
              Stats 1
            </Text>

            <Block row>
              <PieChart
                //
                data={pieChartData}
                valueAccessor={({ item }) => item.count}
                style={{
                  height: 200,
                  width: 200,
                }}
                spacing={0}
                innerRadius={20}
                outerRadius={80}
                labelRadius={110}
              >
                {/* <PieChartLabels /> */}
                <PieChartLabelsOffChart />
              </PieChart>

              <Block align='flex-start'>
                {pieChartData.map((dataPoint, dataPointIndex) => {
                  return (
                    <Block
                      key={dataPoint.name}
                      flex={0}
                      row
                      align='center'
                      marginTop={!!dataPointIndex ? sizes.s : sizes.md}
                    >
                      <Block
                        key={dataPoint.name}
                        flex={0}
                        width={15}
                        height={15}
                        radius={15}
                        color={dataPoint.svg.fill}
                      />
                      <Text marginLeft={sizes.sm}>{dataPoint.name}</Text>
                    </Block>
                  );
                })}
              </Block>
            </Block>
          </Block>

          <Block flex={0} card marginTop={sizes.m} paddingHorizontal={sizes.m}>
            <Text size='h4' variant='secondary'>
              Stats 2
            </Text>

            <BarChart
              style={{ height: 200 }}
              gridMin={0}
              gridMax={10}
              data={barChartData}
              svg={{ fill: String(colors.primary) + '70' }}
              contentInset={{ top: 30, bottom: 30 }}
              yAccessor={({ item }) => item.value}
              numberOfTicks={4}
            >
              <Grid ticks={[0, 1]} direction={Grid.Direction.HORIZONTAL} />
              <BarChartLabels />
            </BarChart>

            <XAxis
              style={{ marginTop: -10 }}
              data={barChartData}
              scale={scale.scaleBand}
              formatLabel={(value, index) => {
                return barChartData[index]?.label;
              }}
              svg={{
                height: 100,
                fill: 'black',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            />
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default DashboardScreen;
