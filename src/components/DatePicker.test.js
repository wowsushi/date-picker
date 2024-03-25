import { render, screen, fireEvent } from '@testing-library/react'
import DatePicker from './DatePicker'
import dayjs from 'dayjs'

test('renders correct month if pass current to DatePicker', () => {
  render(<DatePicker current="2022-10-10" />)
  const headerText = screen.getByText(/2022 年 10 月/i)
  expect(headerText).toBeInTheDocument()
})

test('should go to previous month when click prev month button', () => {
  render(<DatePicker current="2022-10-10" />)
  const arrow = screen.getByTestId('month-select-prev')
  fireEvent.click(arrow)
  const headerText = screen.getByText(/2022 年 09 月/i)
  expect(headerText).toBeInTheDocument()
})

test('should go to next month when click next month button', () => {
  render(<DatePicker current="2022-10-10" />)
  const arrow = screen.getByTestId('month-select-next')
  fireEvent.click(arrow)
  const headerText = screen.getByText(/2022 年 11 月/i)
  expect(headerText).toBeInTheDocument()
})

test('should have class name "today" if match today', () => {
  render(<DatePicker />)
  const today = dayjs().date()
  const todayDom = screen.getByText((content) => content.startsWith(today), {
    selector: '.today',
  })
  expect(todayDom).toBeInTheDocument()
})

test('should have class name "active" when select specific date', () => {
  render(<DatePicker />)
  const date = 1
  const item = screen.queryAllByText((content) => content.startsWith(date))[0]
  fireEvent.click(item)
  expect(item).toHaveClass('active')
})

test('should update starting active date when clicked date is before previous one', () => {
  render(<DatePicker />)
  const date = 6
  const item = screen.queryAllByText((content) => content.startsWith(date))[0]
  fireEvent.click(item)
  expect(item).toHaveClass('active')

  const beforeItem = screen.queryAllByText((content) =>
    content.startsWith(date - 1),
  )[0]
  fireEvent.click(beforeItem)
  expect(item).not.toHaveClass('active')
  expect(beforeItem).toHaveClass('active')
})

test('should update end date when clicked date is after previous one', () => {
  render(<DatePicker />)
  const date = 6
  const item = screen.queryAllByText((content) => content.startsWith(date))[0]
  fireEvent.click(item)
  expect(item).toHaveClass('active')

  const afterItem = screen.queryAllByText((content) =>
    content.startsWith(date + 1),
  )[0]
  fireEvent.click(afterItem)
  expect(item).toHaveClass('active')
  expect(afterItem).toHaveClass('active')
})
