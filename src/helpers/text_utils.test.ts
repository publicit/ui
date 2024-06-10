import { truncateTime } from './text_utils'

test('truncateTime', () => {
    const d = new Date(2023, 10, 30, 16, 55, 31)
    const res = truncateTime(d).toUTCString()
    const expected = 'Thu, 30 Nov 2023 06:00:00 GMT'
    expect(res).toEqual(expected)
})
