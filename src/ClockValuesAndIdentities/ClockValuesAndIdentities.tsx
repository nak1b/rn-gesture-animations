import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { Button, Card, cards } from '../components';

const {
  Value,
  useCode,
  block,
  set,
  not,
  add,
  cond,
  eq,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  interpolate,
  Extrapolate,
} = Animated;
const duration = 2000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default () => {
  const [show, setShow] = useState(true);
  const { time, clock, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      time: new Value(0),
      progress: new Value(0),
    }),
    []
  );

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  useCode(() =>
    block([
      // 1) if clock not running start clock and
      // save original clock value in time
      cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),

      // 2) calculate progress of animation
      set(
        progress,
        interpolate(clock, {
          inputRange: [time, add(time, duration)],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP
        })
      ),

      // 3) if animaton is over, stop clock
      cond(eq(progress, 1), stopClock(clock))
    ])
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button
        label={show ? 'Hide' : 'Show'}
        primary
        onPress={() => setShow(!show)}
      />
    </View>
  );
};
