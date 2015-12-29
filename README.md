# MoneyMakesTheWorldGoRound

##What, How, Why?

It is just a fun project to learn more about web APIs and web programing. **You can check out the live website [here](http://gc1569.nyuad.im/MoneyMakesTheWorld/).** 

The website makes constantly requests to Instagram trough its API, looking for the most recent images with #money. It send the newest pictures across the screen. Whenever there is a new one, it also spins the globe, which stands for the metaphor “money makes the world go round”. I created the globe with THREE JS. I thought this little metaphor would be a small joke around which the project could be based.

Staying with the theme of money, the globe also present data on wealth distribution and population distribution by continents, which is always interesting to look at. A lot of people have misconceptions about the size and importance of Asia and think that it is unfair that it is becoming the most dominant region of the globe. But when you look at it, it is simply far larger than any other continent.

##How does it work?

###The Instagram part:
After document load I send Ajax requests to the Instagram API every four seconds. In this request I ask for the most recent Instagram pictures with #money. Following that, I check if it is new or not. If yes it puts them in the not new list, I’ll put the image in a div that goes across the screen, and updates a variable that will spin the globe.

###THREE JS part:
First, I have to set up the scene, camera, renderer. Then I continue adding lights, the sphere, with the correct texture. Then I manually calculated the coordinates where I should put the bars on the globe and their sizes to correspond with the data I want to present. I store this information in an array. Then in a for loop I create all the bars. Following that I have a function for window re-size, which just helps me make the website more responsive. Lastly, I have the animation function where the globe is rendered and rotated.

##Design

After getting some feedback from peers, I tried to go for a much cleaner look. I tried the black background, but I didn’t think it fit well with the theme, so I went with white. I kept the map legend as short as possible and made the explanation about the images going across only “New #money”, again to keep it simple and self explanatory.

##Challenges and the future

It was a constant challenge to look up how to do something, because there aren’t as many resources as I imagined and the documentation was not easy to navigate in. The other challenge is the design. As I mentioned earlier, the feedback from my peers was really useful and I tried to act upon it.
