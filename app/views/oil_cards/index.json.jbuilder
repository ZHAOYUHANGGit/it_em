json.array!(@oil_cards) do |oil_card|
  json.extract! oil_card, :id
  json.url oil_card_url(oil_card, format: :json)
end
