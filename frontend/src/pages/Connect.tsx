import { useState } from "react"
import { Code, DownloadIcon, KeyRoundIcon, PlugIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
} from "@/components/ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { Separator } from "@/components/ui/separator"


type Step = {
    title: string
    description: string
    icon: LucideIcon
    label: string // shown in the code block header
    code: string
}

// Replace the titles, descriptions and code with your own
const STEPS: Step[] = [
    {
        title: "Install the SDK",
        description: "Add the NodeJS package to your project.",
        icon: DownloadIcon,
        label: "bash",
        code: `
npm install catapult
`,
    },
    {
        title: "Copy the SDK keys",
        description: "Add SDK keys to environment variables.",
        icon: KeyRoundIcon,
        label: ".env",
        code: `
CATAPULT_SDK_KEY=your-sdk-key
`,
    },
    {
        title: "Initialize the SDK",
        description: "Connect your application to Catapult's server.",
        icon: PlugIcon,
        label: "ts",
        code: `
import { Catapult } from "catapult"

const catapult = new Catapult({ sdkKey: process.env.CATAPULT_SDK_KEY })
`,
    },
]


// One code block. Lives in its own component so every step can highlight its own code.
const StepCode = ({ code, label, wrap }: { code: string; label: string; wrap: boolean }) => {
    const lines = useHighlightedCode(code, "ts")

    return (
        <CodeBlock className="bg-neutral-800/40 rounded-md">
            <CodeBlockHeader>
                <CodeBlockTitle className="text-neutral-400">
                    <div className="flex items-center gap-2">
                        <Code />
                        {label}
                    </div>
                </CodeBlockTitle>
                <CodeBlockActions>
                    <CodeBlockCopyButton value={code} />
                </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent wrap={wrap} lineNumbers>
                {lines.map((line, index) => (
                    <CodeBlockLine
                        key={index}
                        variant={index >= 5 && index <= 9 ? "highlighted" : "default"}
                    >
                        {line}
                    </CodeBlockLine>
                ))}
            </CodeBlockContent>
        </CodeBlock>
    )
}


// The thread: every step is always open, a vertical line connects the step icons.
const ConnectThread = ({ wrap }: { wrap: boolean }) => {
    return (
        <div className="max-w-3xl">
            {STEPS.map((step, index) => {
                const Icon = step.icon
                const isLast = index === STEPS.length - 1

                return (
                    <div key={step.title} className="relative pb-12 last:pb-0">
                        {/* connecting line: starts under this step's icon, stops just above the next one */}
                        {!isLast && (
                            <span
                                aria-hidden="true"
                                className="absolute left-3.5 top-9 bottom-1 w-px -translate-x-1/2 bg-neutral-700"
                            />
                        )}

                        {/* step header */}
                        <Trace>
                            <TraceLine className="flex items-center gap-3">
                                <TraceIcon className="flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 [&_svg]:size-3.5">
                                    <Icon />
                                </TraceIcon>
                                <TraceTitle className="text-xl leading-7 font-normal text-neutral-100">
                                    {step.title}
                                </TraceTitle>
                            </TraceLine>
                        </Trace>

                        {/* step details, always visible */}
                        <div className="ml-10 mt-2">
                            <div className="text-neutral-400 text-sm">{step.description}</div>
                            <div className="mt-3">
                                <StepCode code={step.code} label={step.label} wrap={wrap} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


const Connect = () => {

    const [wrap, setWrap] = useState(false)

    return (
        <div className='min-h-screen px-10 py-5 bg-neutral-900'>
            <div className='mb-5 flex flex-col items-start justify-start'>
                <div className='text-2xl font-medium text-neutral-100 '> Connect </div>
                <div className=" text-neutral-400 mt-1"> Initialize the SDK and connect your application with Catapult's server.
                </div>
            </div>

            <Separator className="my-2 bg-neutral-800" />

            <div className='mt-15'>
                <Tabs>
                    <TabsList>
                        <TabsTab value="tab-1" className="w-40 data-active:text-neutral-900 ">Development</TabsTab>
                        <TabsTab value="tab-2" className="w-40 data-active:text-neutral-900 ">Staging</TabsTab>
                    </TabsList>

                    <TabsPanel value="tab-1">
                        <div className="mt-10">
                            <ConnectThread wrap={wrap} />
                        </div>
                    </TabsPanel>

                    <TabsPanel value="tab-2">

                    </TabsPanel>
                </Tabs>
            </div>




        </div>
    )
}

export default Connect