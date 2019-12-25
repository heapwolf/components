const Tonic = require('@optoolco/tonic')

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function pad (num) {
  return `0${num}`.slice(-2)
}

function strftime (time, formatString) {
  const day = time.getDay()
  const date = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, (_arg) => {
    let match
    const modifier = _arg[1]

    switch (modifier) {
      case '%':
        return '%'
      case 'a':
        return weekdays[day].slice(0, 3)
      case 'A':
        return weekdays[day]
      case 'b':
        return months[month].slice(0, 3)
      case 'B':
        return months[month]
      case 'c':
        return time.toString()
      case 'd':
        return pad(date)
      case 'e':
        return String(date)
      case 'H':
        return pad(hour)
      case 'I':
        return pad(strftime(time, '%l'))
      case 'l':
        if (hour === 0 || hour === 12) {
          return String(12)
        } else {
          return String((hour + 12) % 12)
        }
      case 'm':
        return pad(month + 1)
      case 'M':
        return pad(minute)
      case 'p':
        if (hour > 11) {
          return 'PM'
        } else {
          return 'AM'
        }
      case 'P':
        if (hour > 11) {
          return 'pm'
        } else {
          return 'am'
        }
      case 'S':
        return pad(second)
      case 'w':
        return String(day)
      case 'y':
        return pad(year % 100)
      case 'Y':
        return String(year)
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/)
        return match ? match[1] : ''
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /)
        return match ? match[1] : ''
    }
    return ''
  })
}

function makeFormatter (options) {
  let format

  return function () {
    if (format) {
      return format
    }

    if ('Intl' in window) {
      try {
        format = new Intl.DateTimeFormat(undefined, options)
        return format
      } catch (e) {
        if (!(e instanceof RangeError)) {
          throw e
        }
      }
    }
  }
}

let dayFirst = null
const dayFirstFormatter = makeFormatter({ day: 'numeric', month: 'short' })

// Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
function isDayFirst () {
  if (dayFirst !== null) {
    return dayFirst
  }

  const formatter = dayFirstFormatter()
  if (formatter) {
    const output = formatter.format(new Date(0))
    dayFirst = !!output.match(/^\d/)
    return dayFirst
  } else {
    return false
  }
}

let yearSeparator = null

const yearFormatter = makeFormatter({
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

// Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
function isYearSeparator () {
  if (yearSeparator !== null) {
    return yearSeparator
  }

  const formatter = yearFormatter()

  if (formatter) {
    const output = formatter.format(new Date(0))
    yearSeparator = !!output.match(/\d,/)
    return yearSeparator
  } else {
    return true
  }
}

function isThisYear (date) {
  const now = new Date()
  return now.getUTCFullYear() === date.getUTCFullYear()
}

function makeRelativeFormat (locale, options) {
  if ('Intl' in window && 'RelativeTimeFormat' in window.Intl) {
    try {
      return new Intl.RelativeTimeFormat(locale, options)
    } catch (e) {
      if (!(e instanceof RangeError)) {
        throw e
      }
    }
  }
}

function localeFromElement (el) {
  const container = el.closest('[lang]')

  if (container instanceof window.HTMLElement && container.lang) {
    return container.lang
  }

  return 'default'
}

class TonicRelativeTime extends Tonic {
  render () {
    this.date = this.props.date || ''
    this.locale = this.props.locale || localeFromElement(this)

    if (typeof this.date === 'string') {
      this.date = this.props.date = new Date(this.props.date)
    }

    if (this.date.toString() === 'Invalid Date') {
      this.date = new Date()
    }

    if (this.props.refresh) {
      this.interval = setInterval(() => {
        console.log(this.props.date)
        this.reRender(props => ({
          ...props,
          date: this.date
        }))
      }, +this.props.refresh)
    }

    const ago = this.timeElapsed()

    if (ago) {
      return ago
    }

    const ahead = this.timeAhead()

    if (ahead) {
      return ahead
    } else {
      return `on ${this.formatDate()}`
    }
  }

  get value () {
    return this.date
  }

  timeElapsed () {
    const ms = new Date().getTime() - this.date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)

    if (ms >= 0 && day < 30) {
      return this.timeAgoFromMs(ms)
    } else {
      return null
    }
  }

  timeAhead () {
    const ms = this.date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    if (ms >= 0 && day < 30) {
      return this.timeUntil()
    } else {
      return null
    }
  }

  timeAgo () {
    const ms = new Date().getTime() - this.date.getTime()
    return this.timeAgoFromMs(ms)
  }

  timeAgoFromMs (ms) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (ms < 0) {
      return formatRelativeTime(this.locale, 0, 'second')
    } else if (sec < 10) {
      return formatRelativeTime(this.locale, 0, 'second')
    } else if (sec < 45) {
      return formatRelativeTime(this.locale, -sec, 'second')
    } else if (sec < 90) {
      return formatRelativeTime(this.locale, -min, 'minute')
    } else if (min < 45) {
      return formatRelativeTime(this.locale, -min, 'minute')
    } else if (min < 90) {
      return formatRelativeTime(this.locale, -hr, 'hour')
    } else if (hr < 24) {
      return formatRelativeTime(this.locale, -hr, 'hour')
    } else if (hr < 36) {
      return formatRelativeTime(this.locale, -day, 'day')
    } else if (day < 30) {
      return formatRelativeTime(this.locale, -day, 'day')
    } else if (month < 12) {
      return formatRelativeTime(this.locale, -month, 'month')
    } else if (month < 18) {
      return formatRelativeTime(this.locale, -year, 'year')
    } else {
      return formatRelativeTime(this.locale, -year, 'year')
    }
  }

  microTimeAgo () {
    const ms = new Date().getTime() - this.date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (min < 1) {
      return '1m'
    } else if (min < 60) {
      return `${min}m`
    } else if (hr < 24) {
      return `${hr}h`
    } else if (day < 365) {
      return `${day}d`
    } else {
      return `${year}y`
    }
  }

  timeUntil () {
    const ms = this.date.getTime() - new Date().getTime()
    return this.timeUntilFromMs(ms)
  }

  timeUntilFromMs (ms) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)
    if (month >= 18) {
      return formatRelativeTime(this.locale, year, 'year')
    } else if (month >= 12) {
      return formatRelativeTime(this.locale, year, 'year')
    } else if (day >= 45) {
      return formatRelativeTime(this.locale, month, 'month')
    } else if (day >= 30) {
      return formatRelativeTime(this.locale, month, 'month')
    } else if (hr >= 36) {
      return formatRelativeTime(this.locale, day, 'day')
    } else if (hr >= 24) {
      return formatRelativeTime(this.locale, day, 'day')
    } else if (min >= 90) {
      return formatRelativeTime(this.locale, hr, 'hour')
    } else if (min >= 45) {
      return formatRelativeTime(this.locale, hr, 'hour')
    } else if (sec >= 90) {
      return formatRelativeTime(this.locale, min, 'minute')
    } else if (sec >= 45) {
      return formatRelativeTime(this.locale, min, 'minute')
    } else if (sec >= 10) {
      return formatRelativeTime(this.locale, sec, 'second')
    } else {
      return formatRelativeTime(this.locale, 0, 'second')
    }
  }

  microTimeUntil () {
    const ms = this.date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)
    if (day >= 365) {
      return `${year}y`
    } else if (hr >= 24) {
      return `${day}d`
    } else if (min >= 60) {
      return `${hr}h`
    } else if (min > 1) {
      return `${min}m`
    } else {
      return '1m'
    }
  }

  formatDate () {
    let format = isDayFirst() ? '%e %b' : '%b %e'
    if (!isThisYear(this.date)) {
      format += isYearSeparator() ? ', %Y' : ' %Y'
    }
    return strftime(this.date, format)
  }

  formatTime () {
    const formatter = timeFormatter()
    if (formatter) {
      return formatter.format(this.date)
    } else {
      return strftime(this.date, '%l:%M%P')
    }
  }
}

module.exports = { TonicRelativeTime }

function formatRelativeTime (locale, value, unit) {
  const formatter = makeRelativeFormat(locale, { numeric: 'auto' })

  if (formatter) {
    return formatter.format(value, unit)
  } else {
    return formatEnRelativeTime(value, unit)
  }
}

// Simplified "en" RelativeTimeFormat.format function
//
// Values should roughly match
//   new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(value, unit)
//
function formatEnRelativeTime (value, unit) {
  if (value === 0) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `this ${unit}`
      case 'day':
        return 'today'
      case 'hour':
      case 'minute':
        return `in 0 ${unit}s`
      case 'second':
        return 'now'
    }
  } else if (value === 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `next ${unit}`
      case 'day':
        return 'tomorrow'
      case 'hour':
      case 'minute':
      case 'second':
        return `in 1 ${unit}`
    }
  } else if (value === -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `last ${unit}`
      case 'day':
        return 'yesterday'
      case 'hour':
      case 'minute':
      case 'second':
        return `1 ${unit} ago`
    }
  } else if (value > 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `in ${value} ${unit}s`
    }
  } else if (value < -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `${-value} ${unit}s ago`
    }
  }

  throw new RangeError(`Invalid unit argument for format() '${unit}'`)
}

const timeFormatter = makeFormatter({
  hour: 'numeric',
  minute: '2-digit'
})
