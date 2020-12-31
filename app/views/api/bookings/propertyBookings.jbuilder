json.bookings do
  json.array! @bookings do |booking|
    json.user_id booking.user_id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.user do
      json.username booking.user.username
    end
    json.paid booking.is_paid?
  end
end
