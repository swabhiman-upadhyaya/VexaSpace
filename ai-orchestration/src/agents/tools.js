import axios from "axios"
import { tool } from "langchain"
import * as z from "zod"

export const listFiles = tool(
  async ({ }, config) => {

    console.log("=============================")
    console.log("Using list files tool")
    console.log("=============================")

    // BY AI START
    const response = await axios.get(`http://sandbox-service-${config.configurable.projectId}:3000/list-files`);
    // BY AI END

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
  async ({ files }, config) => {

    console.log("=============================")
    console.log("Using read files tool", files)
    console.log("=============================")

    // BY AI START
    const response = await axios.get(`http://sandbox-service-${config.configurable.projectId}:3000/read-files?files=` + files.join(","));
    // BY AI END

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
  async ({ files }, config) => {

    console.log("=============================")
    console.log("Using update files tool", files)
    console.log("=============================")

    // BY AI START
    const response = await axios.patch(`http://sandbox-service-${config.configurable.projectId}:3000/update-files`, {
      updates: files
    });
    // BY AI END

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
    description: "Update or create files in the project. Use this tool only after reading the relevant files, tracing the logic end-to-end for correctness (initial states, loop guards, closures, event defaults), and determining the exact changes required. This tool returning success only confirms the files were written to disk — it does not confirm the logic is correct. After a successful call, verify the change against the user's request before replying.",
    schema: z.object({
      files: z.array(z.object({
        file: z.string().describe("The absolute path of the file to update"),
        content: z.string().describe("The new content for the file")
      })).describe("The list of files to update and their new content")
    })
  }
)