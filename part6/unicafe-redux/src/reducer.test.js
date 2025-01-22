import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { testIncrement } from './test_helper'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  describe('increments work', () => {
      test('good is incremented', () => {
        const newState = testIncrement(
          'GOOD', initialState, counterReducer
        )

        expect(newState).toEqual({
          good: 1,
          ok: 0,
          bad: 0
        })
      })
    
      test('ok is incremented', () => {
        const newState = testIncrement(
          'OK', initialState, counterReducer
        )

        expect(newState).toEqual({
          good: 0,
          ok: 1,
          bad: 0
        })
      })

      test('bad is incremented', () => {
        const newState = testIncrement(
          'BAD', initialState, counterReducer
        )

        expect(newState).toEqual({
          good: 0,
          ok: 0,
          bad: 1
        })
      })
    })

    test('reset resets state', () => {
      const incrementedState = testIncrement(
        'BAD', initialState, counterReducer
      )
  
      const zeroState = counterReducer(incrementedState, { type: 'ZERO'})
      expect(zeroState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    })
  })