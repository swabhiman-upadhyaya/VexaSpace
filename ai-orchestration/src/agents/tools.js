import axios from "axios"
import { tool } from "langchain"
import * as z from "zod"

export const listFiles = tool(
  async ({ }) => {

    console.log("=============================")
    console.log("Using list files tool")
    console.log("=============================")

    const response = await axios.get("http://019ff091-1214-726f-92c6-aeaac3c6c14a.agent.localhost/list-files");

    console.log("=============================")
    console.log("Response from list files tool:", response.data);
    console.log("=============================")

    return JSON.stringify({
      success: true,
      files: response.data.files,
    });
  },
  {
    name: "list_files",
    description: "List all the files in the project directory, This is useful for understanding what files are available to work with.",
    schema: z.object({}),
  }
)

export const readFiles = tool(
  async ({ files }) => {

    console.log("=============================")
    console.log("Using read files tool", files)
    console.log("=============================")

    const response = await axios.get(`http://019ff091-1214-726f-92c6-aeaac3c6c14a.agent.localhost/read-files?files=` + files.join(","));

    console.log("=============================")
    console.log("Response from read files tool:", response.data)
    console.log("=============================")

    return JSON.stringify({
      success: true,
      files: response.data.files,
    });
  },
  {
    name: "read_files",
    description: "Read the contents of a file in the project directory, This is useful for understanding what is inside a file.",
    schema: z.object({
      files: z.array(z.string()).describe("The list of files absolute paths to read, These should be the files that were listed using the list_files tool or created later."),
    }),
  }
)

export const updateFiles = tool(
  async ({ files }) => {

    console.log("=============================")
    console.log("Using update files tool", files)
    console.log("=============================")

    const response = await axios.patch(`http://019ff091-1214-726f-92c6-aeaac3c6c14a.agent.localhost/update-files`, {
      updates: files
    });

    console.log("=============================")
    console.log("Using update files tool", response.data);
    console.log("=============================")

    return JSON.stringify({
      success: true,
      message: "Files updated successfully",
      files: response.data.files
    });
  },
  {
    name: "update_files",
    description: "Update or create files in the project. Use this tool after reading the relevant files and determining the exact changes required by the user's request. After successfully updating the requested files, consider the task complete.",
    schema: z.object({
      files: z.array(z.object({
        file: z.string().describe("The absolute path of the file to update"),
        content: z.string().describe("The new content for the file")
      })).describe("The list of files to update and their new content")
    })
  }
)