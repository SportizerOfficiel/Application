import React from 'react';
import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, createStyles, getStylesRef, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    height: rem(280),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
 
    [`&:hover .${getStylesRef('image')}`]: {
      transform: 'scale(1.03)',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  },

  title: {
    color: theme.white,
    textTransform:"capitalize",

  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));



function ImageCard({ image, title,display, link,action=()=>{} }) {
  const { classes, theme } = useStyles();
  return (
    <Card
      padding="xs"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"

      onClick={(e)=>{e.preventDefault(); if(display)action()}}
      target="_blank"
      sx={(theme)=>({
        cursor: display ? "pointer" : ""
      })}
    >
      <div className={classes.image} style={{ backgroundImage: `url(${image})`,objectFit:"cover",backgroundPosition:"center" ,
        filter: display ? "" :  "grayscale(1)"
    }} />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {title}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ImageCard