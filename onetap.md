# 🤖 WISDOM TMPV - شرح شامل من A إلى Z

## 🧠 شنو هو هاد البوت؟

**Wisdom TMPV** (Temporary Voice) هو Discord Bot كيخدم باش ينشئ **قنوات صوتية مؤقتة** للأعضاء فالسيرفر. فكرة الشغل ديالو:
- عضو كيدخل لقناة صوتية سميتها **"➕│Create Room"**
- البوت كينشئ ليه **قناة صوتية جديدة خاصة** و كيدوزو ليها
- المالك كيبقا عندو **التحكم الكامل** فيها: القفل، التحدية، التسمية، الطرد...
- غير المالك ولا لي سمح ليهم يقدر يدخلو ليها
- **ملي كتفوت 10 ثواني** و القناة خاوية، البوت كيمسحها **أوتوماتيكياً**

---

## 📁 هيكلة المشروع

```
onetap v seif/
├── index.js                      # الملف الرئيسي (كل المنطق)
├── commands/
│   ├── tempvc/                   # أوامر التحكم فالقناة
│   │   ├── lock.js, unlock.js    # قفل/فتح القناة
│   │   ├── hide.js, unhide.js    # تخبية/إظهار القناة
│   │   ├── name.js               # تغيير الاسم
│   │   ├── limit.js              # تحديد عدد الأعضاء
│   │   ├── claim.js              # استحواذ على قناة خاوية
│   │   ├── transfer.js           # نقل الملكية لعضو آخر
│   │   ├── permit.js             # السماح لعضو معين
│   │   ├── reject.js             # منع عضو معين
│   │   ├── unreject.js           # إلغاء المنع
│   │   ├── kick.js               # طرد عضو
│   │   ├── invite.js             # دعوة عضو
│   │   ├── panel.js              # لوحة التحكم (أزرار)
│   │   ├── status.js             # تغيير الحالة
│   │   ├── vcinfo.js             # معلومات القناة
│   │   ├── owner.js              # عرض المالك
│   │   ├── permitrole.js         # السماح لرول معين
│   │   ├── rejectrole.js         # منع رول معين
│   │   ├── sbon.js / sboff.js    # تفعيل/تعطيل الصوت
│   │   ├── camon.js / camoff.js  # تفعيل/تعطيل الكاميرا
│   │   ├── activityon.js / activityoff.js  # الأكتيفيتي
│   │   ├── sendchat.js           # إرسال للشات المرفق
│   │   └── transfer.js           # نقل الملكية
│   ├── admin/                    # أوامر الإدارة
│   │   ├── wissetup.js           # الإعداد الأولي (ينشئ القنوات)
│   │   ├── add.js                # إضافة عضو Premium
│   │   ├── remove.js             # إزالة عضو Premium
│   │   ├── blacklist.js          # منع عضو من إنشاء القنوات
│   │   ├── rblacklist.js         # إلغاء المنع
│   │   ├── blist.js              # عرض قائمة الممنوعين
│   │   ├── bl.js                 # Blacklist عام
│   │   ├── wl.js                 # Whitelist عام
│   │   ├── clearpremium.js       # مسح كل Premium
│   │   └── modhelp.js            # مساعدة الإدارة
│   ├── premium/                  # أوامر Premium
│   │   ├── whitelist.js          # إضافة عضو للـ Whitelist
│   │   ├── unwhitelist.js        # إزالة من Whitelist
│   │   ├── whitelistlist.js      # عرض Whitelist
│   │   ├── whitelistlista.js     # نشر Whitelist Monitor
│   │   ├── save.js               # حفظ القناة (من الحذف)
│   │   ├── safehouse.js          # حماية SafeHouse
│   │   ├── myoffer.js            # عرض العروض
│   │   ├── offershelp.js         # مساعدة العروض
│   │   ├── premium.js            # معلومات Premium
│   │   └── phelp.js              # مساعدة Premium
│   └── utility/                  # أوامر عامة
│       ├── help.js               # المساعدة العامة
│       ├── wishelp.js            # مساعدة Wisdom
│       ├── manhelp.js            # مساعدة Manual
│       ├── bhelp.js              # مساعدة Blacklist
│       ├── modhelp.js            # مساعدة Moderator
│       ├── phelp.js              # مساعدة Premium
│       ├── tmpvrules.js          # قوانين TMPV
│       ├── apollo.js             # كريديت APOllO
│       ├── vping.js              # اختبار الاتصال
│       ├── top.js                # نقل القناة لأعلى (Premium)
│       ├── list.js               # عرض القنوات النشطة
│       ├── plist.js              # عرض Premium List
│       ├── botjoin.js            # جلب البوت للقناة
│       ├── botleave.js           # إخراج البوت من القناة
│       └── rememberme.js         # حفظ الإعدادات الشخصية
├── utils/
│   ├── premiumStorage.js         # MongoDB - تخزين الـ Premium
│   ├── jsonStorage.js            # MongoDB - تخزين القنوات المؤقتة
│   ├── blacklistStorage.js       # MongoDB - تخزين الممنوعين
│   ├── helpers.js                # دوال مساعدة (Cooldown, Ownership, VoiceStatus)
│   ├── logger.js                 # نظام تسجيل الأحداث
│   ├── panelUpdater.js           # تحديث الـ Whitelist Panel
│   └── test_blacklist.js         # اختبار الـ Blacklist
├── data/                         # بيانات (JSON)
├── .env                          # المتغيرات السرية
├── dockerfile / docker-compose   # نشر عبر Docker
├── start_bot.bat / .ps1          # تشغيل على Windows
├── package.json                  # الاعتماديات
├── README_24_7.md                # دليل التشغيل المستمر
└── onetap.md                     # هاد الملف (الشرح الكامل)
```

---

## ⚙️ كيفاش كيخدم البوت بالتفصيل؟

### 1. 🚀 بدء التشغيل (index.js سطر 2295-2315)

فاش كيبدا البوت:
1. **كيتحقق من وجود Sodium** (مكتبة التشفير الصوتي) - سطر 30-45 و 2274-2293
2. **كيتصل بـ MongoDB** (قاعدة البيانات) - سطر 2305
3. **كيدخل لـ Discord** بـ DISCORD_TOKEN - سطر 2308
4. **كيجهز الـ Presence** ديالو (الحالة) - سطر 2215-2218
5. **كيتصل بقناة "Create Room"** فكل سيرفر - سطر 2221-2223

### 2. 🛤️ مسار إنشاء قناة صوتية مؤقتة

ها هي الرحلة كاملة من اللحظة لي كيدخل فيها العضو لقناة "Create Room":

#### الخطوة 1: دخول العضو لـ "Create Room" (سطر 681)
```
voiceStateUpdate event كيتفعل
كيتشوفو: newState.channel.id === CREATE_ROOM_ID
```

#### الخطوة 2: التحقق من الـ Blacklist (سطر 683-696)
- كيتحقق `isBlacklisted(newState.member.id)`
- إذا ممنوع: **كيفصلو** و **كيبعتلو DM** بسبب المنع
- `return` -> ما كيمشيش لخطوة 3

#### الخطوة 3: تحضير الصلاحيات (سطر 698-726)
- **@everyone**: `ViewChannel: false` (القناة مخبية للعامة)
- **المالك**: `Connect, Speak, ViewChannel` (هو فقط لي كيشوفها)
- **TEMP_ROOM_ROLE**: صلاحيات كاملة (ViewChannel, Connect, Speak, SendMessages, UseVAD, Stream)

#### الخطوة 4: المستخدمين الـ Whitelist (سطر 736-762) — خاص بـ Premium
- `getWhitelist(newState.member.id)` كيجيب اللائحة من MongoDB
- كل عضو فيها كيتزاد ليه صلاحية `Connect, ViewChannel, Speak, UseVAD, SendMessages, ReadMessageHistory`

#### الخطوة 5: تحميل الإعدادات المحفوظة (سطر 765-775)
- `getRoomSettings(newState.member.id)` (Premium فقط)
- إذا عندو إعدادات: **الاسم** و **الـ userLimit** كيتطبقو
- **Diamond (Offer 3)**: سمايتو غادي تكون `💎｜Name's Palace`

#### الخطوة 6: إنشاء القناة الصوتية (سطر 779-785)
```javascript
tempChannel = await newState.guild.channels.create({
  name: channelName,           // مثلاً "🎧｜Apollo's Vc"
  type: ChannelType.GuildVoice,
  parent: newState.channel.parent,  // نفس الكاتيجوري
  permissionOverwrites: permissionOverwrites,  // الصلاحيات من خطوة 3-4
  userLimit: userLimit         // العدد الأقصى (null ولا رقم)
})
```

#### الخطوة 7: نقل العضو للقناة الجديدة (سطر 788)
```javascript
await newState.setChannel(tempChannel)
```

#### الخطوة 8: إنشاء Text Channel إذا كان Premium (سطر 793-857)
- إذا العضو **Premium**: كينشئ قناة نصية خاصة
- السم `🎧｜Name・chat`
- نفس الكاتيجوري (أو VIP_TEXT_CATEGORY_ID)
- صلاحيات: **المالك برك** لي كيشوفها (plus Whitelist)
- كيبعت **Welcome Message** فخم بالصورة و الأزرار

#### الخطوة 9: تخزين البيانات (سطر 861-901)
```javascript
channelData = {
  ownerId: newState.member.id,
  textChannelId: currentTextChannelId,  // null إذا ما Premium
  chatLocked: false,
  settings: { status: '**.v help/panel**' },
  isPremium: isPremium
}
```

#### الخطوة 10: إرسال رسالة الترحيب (سطر 930-1070)
- **عادي**: رسالة ترحيب + أزرار (تحكم، ترجمة للدارجة/أمازيغية)
- **Diamond (Offer 3)**: رسالة خاصة مع Announcement ديال Diamond Offer III
- **زر "Control Panel"** كيودي للوحة التحكم الكاملة

#### الخطوة 11: تعيين Voice Status (سطر 904-928)
كيحدد Status القناة (هاد لي كيظهر فوق القناة الصوتية):
- **عادي**: `**.v help/panel**`
- **Diamond**: `**Diamond Vc**`

---

### 3. 🔄 نظام التنظيف الأوتوماتيكي (سطر 134-187)

```javascript
setInterval(async () => {
  // كل 30 ثانية كيتفقد كل القنوات المؤقتة
  for (const [channelId] of tempChannels) {
    channel = await client.channels.fetch(channelId)
    
    if (membersCount === 0) {  // القناة خاوية
      if (cd.savedUntil > Date.now()) {
        // Premium حفظ القناة -> قفلها فقط (لا تحذف)
      } else {
        // -> 10 ثواني مهلة -> حذف القناة
        await channel.delete()
        if (textChannelId) await textChannel.delete()
      }
    }
  }
}, 30000)
```

**النظام:**
- **القناة خاوية ≥ 10 ثواني** -> تحذف + تحذف الـ Text Channel المرفق
- **القناة محفوظة (Save)** -> ما تتحذفش، ولكن تتقفل (auto-lock) لحتى يرجع المالك
- **المالك رجع** -> القناة تنفتح (auto-unlock) — سطر 606-613

---

### 4. 📋 أوامر التحكم كاملة

#### 🎤 أوامر القناة الصوتية

| الأمر | الاختصار | الوظيفة | Cooldown |
|-------|----------|---------|----------|
| `.v lock` | `.v l` | قفل القناة (ما حدش يقدر يدخل) | 10s |
| `.v unlock` | `.v ul` | فتح القناة | 10s |
| `.v hide` | - | تخبية القناة (ما تبانش) | 10s |
| `.v unhide` | - | إظهار القناة | 10s |
| `.v name <text>` | `.v n` | تغيير الاسم (max 90 حرف) | 5min |
| `.v limit <0-99>` | - | تحديد عدد الأعضاء | 1min |
| `.v claim` | `.v cl` | استحواذ إذا المالك خرج (5 دقايق) | - |
| `.v transfer @user` | `.v tr` | نقل الملكية | - |
| `.v kick @user` | `.v k` | طرد عضو | - |
| `.v invite @user` | - | دعوة عضو | - |
| `.v permit @user` | `.v p` | السماح بعضو | - |
| `.v reject @user` | `.v r` | منع عضو | - |
| `.v unreject @user` | `.v ur` | إلغاء المنع | - |
| `.v status` | `.v st` | عرض الحالة | - |
| `.v vcinfo` | `.v vc` | معلومات القناة | - |
| `.v owner` | `.v o` | عرض المالك | - |
| `.v panel` | - | فتح لوحة التحكم (أزرار) | - |
| `.v sb-on` | `.v sb` | تفعيل Soundboard | - |
| `.v sb-off` | `.v sbof` | تعطيل Soundboard | - |
| `.v cam-on` | `.v onst` | تفعيل الكاميرا | - |
| `.v cam-off` | `.v offst` | تعطيل الكاميرا | - |

#### 👑 أوامر Premium

| الأمر | الوظيفة |
|-------|---------|
| `.v whitelist @user` | إضافة عضو لـ Whitelist الدائم |
| `.v unwhitelist @user` | إزالة عضو من Whitelist |
| `.v whitelistlist` | عرض Whitelist ديالك |
| `.v whitelistlista` | نشر لوحة Whitelist (Admin) |
| `.v save <time>` | حفظ القناة من الحذف لمدة (1h/5h) |
| `.v safehouse` / `.v sh` | تفعيل SafeHouse (منع الأدمنز) |
| `.v myoffer` | عرض وضع Premium ديالك |
| `.v offershelp` | مساعدة العروض |
| `.v top` | نقل القناة لأعلى الكاتيجوري |

#### 🛡️ أوامر الإدارة (Admin Role)

| الأمر | الوظيفة |
|-------|---------|
| `.v wissetup` | الإعداد الأولي (ينشئ كل القنوات) |
| `.v add premium member @user <time> <reason>` | إضافة Premium |
| `.v remove member @user` | إزالة Premium |
| `.v blacklist @user <time> <reason>` | منع من إنشاء القنوات |
| `.v rblacklist @user` | إلغاء المنع |
| `.v blist` | عرض الممنوعين |
| `.v clearpremium` | مسح كل Premium |
| `.v bl` / `.v wl` | Blacklist/Whitelist عام |
| `.v permit-role @role` | السماح لرول |
| `.v reject-role @role` | منع رول |

---

### 5. 🪟 لوحة التحكم (Control Panel)

الأمر `.v panel` كيجيب واجهة أزرار كاملة:

```
الصف 1:  [LOCK] [UNLOCK] [RENAME] [LIMIT] [HIDE]
الصف 2:  [UNHIDE] [KICK ALL] [TRANSFER] [INFO] [DELETE]
```

- **LOCK**: يقفل القناة (Connect: false)
- **UNLOCK**: يفتح القناة
- **RENAME**: فتح Modal باش تغير الاسم
- **LIMIT**: فتح Modal باش تحدد العدد (0-99)
- **HIDE**: يخبي القناة (ViewChannel: false)
- **KICK ALL**: يطرد كل الأعضاء إلا المالك و البوتات
- **TRANSFER**: اختيار عضو من Select Menu باش تنقل الملكية
- **INFO**: معلومات كاملة
- **DELETE**: تأكيد => 5s مهلة => حذف (يمكنك الإلغاء)

---

### 6. 🚪 نظام "Ask 2 Join" (طرق الباب)

- الزر `ASK 2 JOIN` كيجيب لائحة بكل **القنوات المقفولة**
- كتختار واحدة -> المالك كيجيه إشعار
- المالك يقدر **يقبل** ولا **يرفض**
- إذا قبل: العضو كيدخل فوراً + كيجيه إشعار

---

### 7. 💎 أنظمة Premium

#### العروض:

| الخاصية | Offer 1 | Offer 2 | Offer 3 (Diamond) |
|----------|---------|---------|---------|
| Whitelist دائم | ✅ | ✅ | ✅ |
| Text Lounge | ✅ | ✅ | ✅ |
| حفظ الإعدادات | ✅ | ✅ | ✅ |
| Save (الحماية من الحذف) | - | ✅ | ✅ |
| Anti-Claim Shield | - | ✅ | ✅ |
| Zero Cooldowns | - | - | ✅ |
| Palace Name (`💎｜Name's Palace`) | - | - | ✅ |
| SafeHouse | - | - | ✅ |
| Top (نقل لأعلى) | - | - | ✅ |

- **Offer 3 (Diamond)**: كيعطي اسم "💎｜Name's Palace" بدل "🎧｜Name's Vc"
- Diamond عندو **Zero Cooldowns**: كيتجاوز كل الـ cooldowns (سطر 332)

#### Premium Storage (MongoDB):

```
Collections:
├── premium_members     # userId, addedBy, addedAt, expiresAt, offer, isActive
├── room_settings       # userId, settings (name, userLimit, locked, hidden)
├── whitelists          # ownerId, whitelistedIds[]
├── global_panels       # guildId, channelId, messageId, type
└── bot_state           # key, value (temp_channels, global_blacklist)
```

---

### 8. 🔐 نظام SafeHouse

خاص بـ **Premium** (Offer 3). كيحمي القناة من **الأدمنز** لي كيدخلو بالرغم من الـ limit.

1. المالك كيشغل `safeHouse` (`.v sh`)
2. إذا فيه limit محدد (userLimit > 0)
3. و أدمن حاول يدخل بعدما ولى الـ limit كامل
4. -> **يتفصل** فوراً + **DM** يانو ممنوع

هادا فين كيتحقق: سطر 502-530

---

### 9. 🌐 Middleware - نظام التحقق من الأوامر

أي أمر قبل ما يتنفذ كيدوز من هاد المراحل (سطر 326-472):

```
1. ✅ Cooldown Check (إلا Diamond -> يتجاوز)
2. ✅ Voice Channel Check (إلا أوامر الإعداد)
3. ✅ Admin Commands Check (ADMIN_ROLE_ID)
4. ✅ Ownership Check (إلا claim, owner, vcinfo)
5. ✅ Temp Channel Check (القناة مسجلة ولا لا)
```

---

### 10. 🗄️ نظام التخزين

#### MongoDB (3 اتصالات منفصلين)
- **premiumStorage.js**: Premium, Room Settings, Whitelists, Panels
- **jsonStorage.js**: القنوات المؤقتة (tempChannels)
- **blacklistStorage.js**: الممنوعين (Global Blacklist)

كلهم كيتصلو بنفس الـ URI ولكن كوليكشنات مختلفين.

#### Cache + MongoDB
- `tempChannels`: Map في الذاكرة + Periodic save كل 5 دقايق لـ MongoDB (سطر 127-131)
- `channelsCache`: hydrate أول مرة + read/write
- `blacklistCache`: نفس الشي
- `processedInteractions`: Set في الذاكرة (تنظيف كل 10 دقايق)
- `cooldownMap`: تنظيف كل 5 دقايق

---

### 11. 🔧 نظام الـ Cooldown (helpers.js سطر 11-35)

```javascript
cooldownMap = new Map()  // userId:commandName -> timestamp
// التنظيف: setInterval(() => cooldownMap.clear(), 5 * 60 * 1000)
```

المدة حسب الأمر:
| الأمر | المدة |
|-------|-------|
| name | 5 دقايق |
| limit | 1 دقيقة |
| lock, unlock, hide, unhide | 10 ثواني |
| bot-join, bot-leave | 5 ثواني |
| باقي | 3 ثواني |

---

### 12. 🔄 نظام إعادة الاتصال بصوت Create Room (سطر 221-282)

البوت كيدير **voice connection** لقناة Create Room باش يبقا "مستعد":
- `joinVoiceChannel` مع `selfDeaf: true, selfMute: true`
- **Auto-retry**: 5 محاولات كحد أقصى
- **Disconnected**: كيرجع يحاول بعد 5 ثواني
- **Connection tracking**: كيتجنب الاتصال المزدوج

---

### 13. 🧪 نظام الـ Blacklist (مزدوج)

#### Per-Room Blacklist
- `commands/blacklist.js` 
- كيمنع عضو معين من الدخول لـ "Create Room"
- عندو مدة صلاحية و سبب
- إذا العضو ف Create Room -> يتفصل فوراً + DM
- كيسجل فالـ Log Channel

#### Global Blacklist
- `commands/bl.js` 
- كيمنع من كل القنوات المؤقتة

---

### 14. 🌍 اللغات المدعومة

البوت كيدعم 3 لغات فـ رسالة المساعدة:
- **English** (إفتراضي)
- **Darija** (الدارجة المغربية)
- **Tamazight / Amazigh** (الأمازيغية)

عن طريق الأزرار `translate_darija`, `translate_amazigh`, `translate_english`

---

### 15. ⚠️ نظام معالجة الأخطاء

- **unhandledRejection**: كيسجل و ما كيوقّفش البوت
- **uncaughtException**: كيسجل و ما كيوقّفش البوت
- **Discord Client Error**: كيسجل
- **try/catch** على **كل** حدث كبير (voiceStateUpdate, interactionCreate, messageCreate)
- **Auto-retry login**: إذا فشل، كيعاود يحاول بعد 5 ثواني (سطر 2312-2313)

---

### 16. 🐳 Docker Deployment

```yaml
# خدمات Docker:
wisdom-tmpv:
  - CPU: 0.20 core
  - RAM: 990M max / 100M reserved
  - Restart: always
```

---

### 17. 📝 أحداث الـ Bot الرئيسية

| الحدث | المكان | الوظيفة |
|-------|--------|---------|
| `voiceStateUpdate` | سطر 490-1078 | إنشاء/حذف القنوات، الصلاحيات، الحماية |
| `messageCreate` | سطر 312-488 | معالجة الأوامر |
| `interactionCreate` (Buttons) | سطر 1081-2102 | الأزرار، Select Menus |
| `interactionCreate` (Modals) | سطر 2105-2202 | النماذج (Rename, Limit) |
| `roleUpdate` | سطر 2228-2253 | مزامنة الصلاحيات مع TEMP_ROOM_ROLE |
| `ready` | سطر 2210-2224 | بدء التشغيل |
| `error/warn` | سطر 2205-2206 | معالجة الأخطاء |

---

### 18. 🔄 تدفق التنظيف التلقائي

```mermaid
كل 30 ثانية -> loop على tempChannels
  |
  ├── القناة مازال موجودة؟
  |     └── لا -> حذف من tempChannels
  |
  ├── membersCount === 0؟
  |     ├── نعم -> savedUntil > now؟
  |     |     ├── نعم -> Auto-Lock (Connect: false)
  |     |     └── لا -> 10s مهلة -> حذف القناة
  |     └── لا -> emptySince.delete (إعادة ضبط المؤقت)
  |
  └── مدة التنظيف: 30 ثانية
```

---

### 19. 🤝 نظام الصلاحيات فالقنوات المؤقتة

**كيفاش كيتعامل البوت مع الصلاحيات:**

#### عند الإنشاء:
- `@everyone`: `ViewChannel: false` (خارج النظرة)
- المالك: كل الصلاحيات
- `TEMP_ROOM_ROLE`: View, Connect, Speak, SendMessages, UseVAD, Stream
- Whitelist: Connect, ViewChannel, Speak, UseVAD, SendMessages, ReadMessageHistory

#### عند دخول عضو (غير مالك):
1. كيتحقق من allowedUsers و rejectedUsers و Whitelist
2. كينسخ صلاحيات `TEMP_ROOM_ROLE` للعضو فردياً
3. إذا فيه Text Channel -> كيعطي الصلاحيات للعضو فيه

#### عند خروج عضو:
- كيمسح صلاحياته (إلا كان فـ Whitelist ولا allowedUsers)
- **Text Channel**: كيمسح الصلاحيات حتى لـ Whitelist

#### عند خروج المالك:
- كيسجل وقت الخروج (`ownerLeftAt`)
- إذا رجع -> كيمسح الـ auto-lock

---

### 20. 🎯 خلاصة عامة

**Wisdom TMPV** هو **نظام متكامل لإدارة القنوات الصوتية المؤقتة** فـ Discord. مبني على:
- **Discord.js v14** مع Components V2 (Buttons, Select Menus, Containers)
- **MongoDB** للتخزين المستمر (Premium, Whitelists, Settings, Blacklist)
- **Cache-First** باش يكون سريع (تخزين فـ Map + save دوري)
- **Premium Tiers** (3 عروض) باش يحقق الدخل
- **Languages**: إنجليزي، دارجة، أمازيغية
- **Anti-Abuse**: SafeHouse, Blacklist, Claim Shield

---

*مكتوب بواسطة APOllO • Wisdom Development Team*
