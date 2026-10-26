# ADR-0002：目录大小、磁盘占用与释放估算分开

[English](0002-measurement.en.md) | **简体中文**

状态：接受。日期：2026-10-26。

目录大小是逻辑文件长度，磁盘占用是考虑已知共享身份的估算；清理选择的预计释放空间必须标注估算。不能简单将各项目目录大小相加后宣称可释放同等空间。

硬链接按卷与文件身份去重；范围外链接、APFS 共享块、快照和其他程序活动使精确释放归属受到限制。未知值不能展示为零。移到废纸篓、处理目标的大小、卷可用空间变化单独记录。

实现和测试见 CW-010、CW-024；说明依据：[pnpm](https://pnpm.io/symlinked-node-modules-structure)、[Apple](https://developer.apple.com/documentation/foundation/about-apple-file-system)。
