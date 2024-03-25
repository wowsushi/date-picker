// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'

dayjs.extend(isBetween)
