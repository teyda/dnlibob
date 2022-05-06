import { ImplConfig } from "../config.ts"
import { Rpc } from "../rpc.ts"
import { Logger } from "../utils/logger.ts"
import { ActionHandler } from "../handle/index.ts"
import { MetaEvent, StandardEvent, BaseEvent } from "../event/index.ts"
import { StandardAction } from "../action.ts"
import { Resps, StatusContent } from "../resp.ts"

export namespace CustomOneBot {
    export interface Config<E, A, R> {
        impl: string,
        platform: string,
        self_id: string,
        config: ImplConfig,
        action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>
    }
}

const logger = new Logger("Teyda_libonebot")

export class CustomOneBot<E, A, R> {
    #rpc: Rpc<E, A, R>
    public impl: string
    public platform: string
    public self_id: string
    public config: ImplConfig
    private running: boolean = false
    private online: boolean = false
    public action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>
    constructor(config: CustomOneBot.Config<E, A, R>) {
        this.impl = config.impl
        this.platform = config.platform
        this.self_id = config.self_id
        this.config = config.config
        this.action_handler = config.action_handler
        this.#rpc = new Rpc<E, A, R>(this.action_handler, this)
    }
    run(): void {
        logger.info(`${logger.red(this.impl)} 正在启动`)
        this.#rpc.http(this.config.http)
        this.#rpc.webhook(this.config.http_webhook)
        this.#rpc.ws(this.config.websocket)
        this.#rpc.wsr(this.config.websocket_rev)
        this.running = true
        if (this.config.heartbeat.enabled) {
            this.start_heartbeat()
        }
    }
    is_running(): boolean {
        return this.running
    }
    get_status(): StatusContent {
        return {
            good: this.online ? this.running : false,
            online: this.online
        }
    }
    send_event<H extends StandardEvent>(event: E | H): void {
        this.#rpc.send(event)
    }
    start_heartbeat(): void {
        if (this.running) {
            setInterval(() => {
                let data = this.build_heartbeat(this.config.heartbeat.interval)
                this.send_event(data)
            }, this.config.heartbeat.interval * 1000)
        }
    }
    build_heartbeat(interval: number): MetaEvent {
        return {
            id: crypto.randomUUID(),
            impl: this.impl,
            platform: this.platform,
            self_id: this.self_id,
            time: new Date().getTime(),
            interval,
            status: this.get_status(),
            sub_type: "",
            detail_type: ""
        }
    }
    new_event(content: E, time: number): BaseEvent<E> {
        return {
            id: crypto.randomUUID(),
            impl: this.impl,
            platform: this.platform,
            self_id: this.self_id,
            time,
            ...content
        }
    }
}

export class OneBot extends CustomOneBot<StandardEvent, StandardAction, Resps>{

}