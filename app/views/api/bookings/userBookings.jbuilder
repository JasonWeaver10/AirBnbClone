json.bookings do 
  json.array! @bookings do |booking|
    json.start_date booking.start_date 
    json.end_date booking.end_date 
    json.property_id booking.property_id
    json.is_paid booking.is_paid?
    json.property_title booking.property.title
    json.checkout_session_id booking.id
  end
end