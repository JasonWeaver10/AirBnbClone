json.booking do
  json.id @booking.id
  json.start_date @booking.start_date
  json.end_date @booking.end_date

  json.property do
    json.id @booking.property.id
    json.title @booking.property.title
    json.images do
      json.array! @booking.property.images do |image|
        json.image url_for(image)
      end
    end
  end
end