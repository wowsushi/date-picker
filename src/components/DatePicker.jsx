import dayjs from 'dayjs'
import { useState, useRef } from 'react'

export default function DatePicker({ current: _current }) {
  const prevClicked = useRef(null)
  const [currentDay, setCurrentDay] = useState(
    _current ? dayjs(_current) : dayjs(),
  )

  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const getYearAndMonth = (currentDay) => {
    return currentDay.format('YYYY 年 MM 月')
  }

  const getDayStatus = (day) => {
    let status = ['day-button']
    if (dayjs().isSame(day, 'day')) {
      status.push('today')
    }

    if (
      (start && end && day.isBetween(start, end, 'day', '[]')) ||
      start?.isSame(day, 'day')
    ) {
      status.push('active')
    }

    if (!day.isSame(currentDay, 'month')) {
      status.push('non_current_month')
    }

    return status.join(' ')
  }

  const handleClickMonth = (offset) => () => {
    setCurrentDay(currentDay.add(offset, 'month'))
  }

  const handleClickDay = (targetDay) => () => {
    const prev = prevClicked.current

    if (!prev || (prev && targetDay.isBefore(prev))) {
      setStart(targetDay)
    } else {
      setEnd(targetDay)
    }

    prevClicked.current = targetDay
  }

  const dateArray = () => {
    const monthStartDate = currentDay.startOf('month')
    const monthEndDate = currentDay.endOf('month')
    const monthEndWeek = monthEndDate.endOf('week')
    let start = monthStartDate.startOf('week')
    let dateList = []

    while (start.isBefore(monthEndWeek)) {
      dateList.push(start)
      start = start.add(1, 'day')
    }

    return dateList
  }

  return (
    <div className="date-picker">
      <div className="header">
        <span
          className="month-select prev"
          data-testid="month-select-prev"
          onClick={handleClickMonth(-1)}
        >
          {'<'}
        </span>
        {getYearAndMonth(currentDay)}
        <span
          className="month-select next"
          data-testid="month-select-next"
          onClick={handleClickMonth(1)}
        >
          {'>'}
        </span>
      </div>
      <div className="days">
        {dateArray().map((day) => {
          return (
            <span
              key={day}
              className={getDayStatus(day)}
              onClick={handleClickDay(day)}
            >
              {day.date() + '日'}
            </span>
          )
        })}
      </div>
    </div>
  )
}
