import { selectTab } from "./ui/tabs/tabBase"
import "./ui/tabs"
import cookieTab from "./ui/tabs/cookie"
import { logic, Save } from "./logic/logic"
import fs from "./fs"

selectTab(cookieTab)

const save = fs.readJSON("cclicker.json") as Save | undefined

if (save) logic.loadSave(save)
