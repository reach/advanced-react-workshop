/*!
Four Yorkshiremen Sketch

Tim Brooke-Taylor; John Cleese; Graham Chapman; and Marty Feldman:
At Last the 1948 Show
*/
import MP from "./avatars/MP.png";
import EI from "./avatars/EI.png";
import TG from "./avatars/TG.png";
import GC from "./avatars/GC.png";

const AVATARS = { MP, EI, TG, GC };

const SCRIPT = [
  {
    speaker: "MP",
    text: `Ahh.. Very passable, this, very passable, not bad at all.`
  },
  {
    speaker: "GC",
    text: `Nothing like a good glass of Chateau de Chassilier wine, ay Gessiah?`
  },
  { speaker: "TG", text: `You're right there Obediah` },
  {
    speaker: "EI",
    text: `Who'd a thought thirty years ago we'd all be sittin' here drinking Chateau de Chassilier wine?`
  },
  {
    speaker: "MP",
    text: `Aye. In them days, we'd a' been glad to have the price of a cup o' tea.`
  },
  { speaker: "GC", text: `A cup a' COLD tea.` },
  { speaker: "EI", text: `Without milk or sugar.` },
  { speaker: "TG", text: `OR tea!` },
  { speaker: "MP", text: `In a filthy, cracked cup.` },
  {
    speaker: "EI",
    text: `We never used to have a cup. We used to have to drink out of a rolled up newspaper.`
  },
  {
    speaker: "GC",
    text: `The best WE could manage was to suck on a piece of damp cloth.`
  },
  {
    speaker: "TG",
    text: `But you know, we were happy in those days, though we were poor.`
  },
  {
    speaker: "MP",
    text: `Aye. BECAUSE we were poor. My old Dad used to say to me, "Money doesn't buy you happiness.`
  },
  {
    speaker: "EI",
    text: `'E was right. I was happier then and I had NOTHIN'. We used to live in this tiiiny old house, with greaaaaat big holes in the roof.`
  },
  {
    speaker: "GC",
    text: `House? You were lucky to have a HOUSE! We used to live in one room, all hundred and twenty-six of us, no furniture. Half the floor was missing; we were all huddled together in one corner for fear of FALLING!`
  },
  {
    speaker: "TG",
    text: `You were lucky to have a ROOM! *We* used to have to live in a corridor!`
  },
  {
    speaker: "MP",
    text: `Ohhhh we used to DREAM of livin' in a corridor! Woulda' been a palace to us. We used to live in an old water tank on a rubbish tip. We got woken up every morning by having a load of rotting fish dumped all over us! House!? Hmph.`
  },
  {
    speaker: "EI",
    text: `Well when I say "house" it was only a hole in the ground covered by a piece of tarpolin, but it was a house to US.`
  },
  {
    speaker: "GC",
    text: `We were evicted from *our* hole in the ground; we had to go and live in a lake!`
  },
  {
    speaker: "TG",
    text: `You were lucky to have a LAKE! There were a hundred and sixty of us living in a small shoebox in the middle of the road.`
  },
  { speaker: "MP", text: `Cardboard box?` },
  { speaker: "TG", text: `Aye.` },
  {
    speaker: "MP",
    text: `You were lucky. We lived for three months in a brown paper bag in a septic tank. We used to have to get up at six o'clock in the morning, clean the bag, eat a crust of stale bread, go to work down mill for fourteen hours a day week in-week out. When we got home, out Dad would thrash us to sleep with his belt!`
  },
  {
    speaker: "GC",
    text: `Luxury. We used to have to get out of the lake at three o'clock in the morning, clean the lake, eat a handful of hot gravel, go to work at the mill every day for tuppence a month, come home, and Dad would beat us around the head and neck with a broken bottle, if we were LUCKY!`
  },
  {
    speaker: "TG",
    text: `Well we had it tough. We used to have to get up out of the shoebox at twelve o'clock at night, and LICK the road clean with our tongues. We had half a handful of freezing cold gravel, worked twenty-four hours a day at the mill for fourpence every six years, and when we got home, our Dad would slice us in two with a bread knife.`
  },
  {
    speaker: "EI",
    text: `Right. I had to get up in the morning at ten o'clock at night, half an hour before I went to bed, (pause for laughter), eat a lump of cold poison, work twenty-nine hours a day down mill, and pay mill owner for permission to come to work, and when we got home, our Dad would kill us, and dance about on our graves singing "Hallelujah."`
  },
  {
    speaker: "MP",
    text: `But you try and tell the young people today that... and they won't believe ya'.`
  },
  { speaker: "MP", text: `Nope..` },
  { speaker: "GC", text: `Noooope...` },
  { speaker: "TG", text: `Nope` },
  { speaker: "EI", text: `Nooope.` }
];

const DELAY = 5000;

const subscribeToMessages = cb => {
  SCRIPT.slice(0)
    .map(message => {
      return { ...message, avatar: AVATARS[message.speaker] };
    })
    .forEach((message, index, arr) => {
      const fillingUpThePage = index < 4;
      const last4 = index > arr.length - 5;
      const timeout = fillingUpThePage
        ? 0
        : last4
          ? (arr.length - 5 - 4) * DELAY + DELAY / 2
          : (index - 4) * DELAY + Math.random() * (DELAY / 2);
      setTimeout(() => cb(message), timeout);
    });
};

export default subscribeToMessages;
