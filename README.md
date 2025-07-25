# Palette Living 家具電商平台

Palette Living 是一個以 Next.js 打造的現代化家具電商平台，提供精選家具商品展示、購物車、訂單管理、商品評論、收藏清單與後台管理等完整功能，致力於帶給用戶高品質的購物體驗。

## 專案簡介

Palette Living 堅持為你帶來高品質的家具體驗。從嚴選材質到精工製作，每一件商品都經過細心把關。我們相信，投資好家具就是投資更好的生活品質。讓我們用心為你的家增添舒適與美感，創造值得珍藏的生活回憶。

## 主要功能

- 首頁精選商品與品牌理念展示
- 商品瀏覽、搜尋、切換列表/網格檢視
- 商品詳細頁（圖片、描述、價格、評價、加入購物車、收藏、分享）
- 購物車管理
- 訂單查詢
- 商品評論（新增、刪除）
- 收藏清單
- 用戶登入/註冊（Clerk）
- 主題切換（深色/淺色）
- 管理後台：商品新增、編輯、刪除

## 安裝與啟動

1. 建議 Node.js 版本：

```bash
Node.js >= 22.13.1
```

2. 安裝相依套件：

```bash
npm install
```

3. 設定環境變數 `.env`（範例）：

```
DB_PASSWORD=你的資料庫密碼
DATABASE_URL=你的PostgreSQL連線字串
DIRECT_URL=你的PostgreSQL direct連線字串
ADMIN_USER_ID=管理員用戶ID
SUPABASE_URL=你的Supabase專案URL
SUPABASE_KEY=你的Supabase金鑰
NEXT_PUBLIC_WEBSITE_URL=網站網址
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=Stripe公開金鑰
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Clerk公開金鑰
CLERK_SECRET_KEY=Clerk密鑰
STRIPE_SECRET_KEY=Stripe密鑰
```

4. 初始化資料庫（Prisma）：

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. 啟動開發伺服器：

```bash
npm run dev
```

瀏覽器開啟 [http://localhost:3000](http://localhost:3000)

## 管理後台

- 進入 `/admin/products` 可進行商品管理（新增、編輯、刪除）
- 僅限管理員權限

## 技術棧

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Clerk（用戶認證）
- Stripe（可擴充串接金流）
- Radix UI、Lucide React、React Icons

## 目錄結構

- `app/`：主要頁面與路由
- `components/`：元件（含 UI、表單、商品、導覽等）
- `lib/`、`utils/`：工具與資料存取
- `prisma/`：Prisma schema 與資料庫設定
- `public/`：靜態資源

> 讓每一件家具，成為你生活中的美好片段與記憶。
