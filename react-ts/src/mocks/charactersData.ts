import { CardProps } from "types/CardProps"


const CHARACTERS: Array<CardProps> = [
  {
    id: 1,
    name: 'Spider-Man',
    description:
      'Peter Parker was bitten by a radioactive spider as a teenager, granting him spider-like powers.',
    img: 'https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8126579-amazing_spider-man_vol_5_54_stormbreakers_variant_textless.jpg',
    ref: {
      comics: [
        {
          name: 'The Amazing Spider-Man',
          id: 1
        },
        {
          name: 'Marvel Tales',
          id: 2
        }
      ],
      series: [
        {
          name: 'What If...? (animated series)',
          id: 1
        },
        {
          name: "Marvel's Spidey and His Amazing Friends",
          id: 2
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Wolverine',
    description:
      'A long-lived mutant with the rage of a beast and the soul of a Samurai, James "Logan" Howlett\'s once mysterious past is filled with blood, war, and betrayal.',
    img: 'https://comicvine.gamespot.com/a/uploads/scale_small/5/57023/7469590-wolverinerb.jpg',
    ref: {
      comics: [
        {
          name: 'The Amazing Spider-Man',
          id: 1
        },
        {
          name: 'Marvel Tales',
          id: 2
        }
      ],
      series: [
        {
          name: 'What If...? (animated series)',
          id: 1
        },
        {
          name: "Marvel's Spidey and His Amazing Friends",
          id: 2
        }
      ]
    }
  },
  {
    id: 3,
    name: 'Captain America',
    description:
      'During World War II, Steve Rogers volunteered to receive the experimental Super-Soldier Serum.',
    img: 'https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8459983-rco031_1650495781.jpg',
    ref: {
      comics: [
        {
          name: 'The Amazing Spider-Man',
          id: 1
        },
        {
          name: 'Marvel Tales',
          id: 2
        }
      ],
      series: [
        {
          name: 'What If...? (animated series)',
          id: 1
        },
        {
          name: "Marvel's Spidey and His Amazing Friends",
          id: 2
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Iron Man',
    description:
      'Tony Stark was the arrogant son of wealthy, weapon manufacturer Howard Stark..',
    img: 'https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8654427-ezgif-1-2f113089e4.jpg',
    ref: {
      comics: [
        {
          name: 'The Amazing Spider-Man',
          id: 1
        },
        {
          name: 'Marvel Tales',
          id: 2
        }
      ],
      series: [
        {
          name: 'What If...? (animated series)',
          id: 1
        },
        {
          name: "Marvel's Spidey and His Amazing Friends",
          id: 2
        }
      ]
    }
  }
];

export default CHARACTERS