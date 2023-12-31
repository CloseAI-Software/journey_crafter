export const journey1 = `
personal:
  name: user1
  age: 25
  isSingle: true
  role: student
  address: beijing
scenario: buy_book_online
goals: buy_a_book

stages:
  - stage: awareness
    tasks:
      - task: discover book
        touchpoint: social media
        emotion: curious

  - stage: consideration
    tasks:
      - task: research books
        touchpoint: search engine
        emotion: focused
      - task: read reviews
        touchpoint: e-commerce website
        emotion: thoughtful
      - task: compare prices
        touchpoint: e-commerce website
        emotion: analytical

  - stage: purchase
    tasks:
      - task: add to cart
        touchpoint: e-commerce website
        emotion: decisive
      - task: fill out payment information
        touchpoint: e-commerce website
        emotion: careful
      - task: complete purchase
        touchpoint: e-commerce website
        emotion: relieved

  - stage: post-purchase
    tasks:
      - task: receive confirmation email
        touchpoint: email
        emotion: satisfied
      - task: track shipment
        touchpoint: e-commerce website
        emotion: curious
      - task: receive book
        touchpoint: doorstep
        emotion: excited
      - task: leave a review
        touchpoint: e-commerce website
        emotion: thoughtful
`;
