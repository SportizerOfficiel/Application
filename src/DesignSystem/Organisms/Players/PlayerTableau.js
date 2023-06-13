/** @format */
import React from "react";
import {
  Group,
  useMantineTheme,
  rem,
  Avatar,
  Badge,
  Table,
  Text,
  Box,
  Anchor,
  ScrollArea,
  ActionIcon,
  Button,
  TextInput,
  Flex,
  Input,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCamera, IconPencil, IconUpload, IconPhoto, IconX, IconPhotoSensor, IconTrash } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useSport } from "@/Context/SportContext";
import ImageChecker from "@/Components/AppRemote/ImageChecker";

const jobColors = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

const Rows = ({ role, data }) => {
  const theme = useMantineTheme();
  return data[role].map((item) => (
    <tr key={item.name}>
      <td>
        <Anchor component="button" size="sm">
          {item.number}
        </Anchor>
      </td>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>
      <td>
        <Badge color={role === "remplacants" ? "blue" : "red"} variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {role}
        </Badge>
      </td>
    </tr>
  ));
};

export default function PlayerTableau({ data, ChangeClubLogo, team }) {
  const theme = useMantineTheme();
  const SportContext = useSport();

  return (
    <>
      <ScrollArea
        sx={(theme) => ({
          width: "100%",
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "200px",
            position: "relative",
          })}
        >
          <Box
            sx={(theme) => ({
              width: "100%",
              height: "200px",
              background: `url("${data.club.clubLogo}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              zIndex: "1",
            })}
          ></Box>
          <ActionIcon
            onClick={() => {
              modals.open({
                size: "xl",
                title: "Image File or URL",
                children: (
                  <>
                    {/* <Dropzone
                      maxFiles={1}
           
                      onDrop={(files) => {
                        console.log("accepted files", files);
                        console.log(3 * 1024 ** 2)
                        const reader = new FileReader();

                        reader.onloadend = () => {
                          setChangingLogo(reader.result);
                          console.log(reader.result)
                        };

                        if (files[0]) {
                          console.log(files[0])
                          reader.readAsDataURL(files[0]);
                        }
                      }}
                      onReject={(files) => console.log("rejected files", files)}
                      maxSize={3 * 1024 ** 2}
                      accept={IMAGE_MIME_TYPE}
                    >
                      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: "none" }}>
                        <Dropzone.Accept>
                          <IconUpload
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]}
                          />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <IconX
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                          />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          <IconPhoto size="3.2rem" stroke={1.5} />
                        </Dropzone.Idle>

                        <div>
                          <Text size="xl" inline>
                            Drag images here or click to select file
                          </Text>
                          <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                          </Text>
                        </div>
                      </Group>
                    </Dropzone>
                    <Flex justify="center" align="center">
                      <Text size="xl" weight="600" mt="xl">
                        OR
                      </Text>
                    </Flex> */}
                    <ImageChecker
                      Submit={(e) => {
                        modals.closeAll()
                        ChangeClubLogo(team, e);
                      }}
                    />
                  </>
                ),
              });
            }}
            sx={(theme) => ({
              position: "absolute",
              zIndex: "2",
              bottom: 0,
              right: 0,
            })}
            size="xl"
            variant="light"
            radius="0"
          >
            <IconCamera />
          </ActionIcon>
        </Box>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Role</th>

              <th />
            </tr>
          </thead>
          <tbody>
            <Rows role="titulaires" data={data}></Rows>
            <Rows role="remplacants" data={data}></Rows>
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
