-- 2026-11-18 : champ « recette » + remplacement des aliments de base par les recettes de docs/recettes-semaine.md.
-- À coller UNE fois dans Supabase > SQL Editor > Run. Tes propres aliments ne sont pas touchés ;
-- tes journées passées gardent leurs valeurs (elles sont copiées dans chaque entrée).
begin;

alter table public.items add column if not exists recipe text;

delete from public.items where name in ('Yaourt nature', 'Flocons d''avoine', 'Banane', 'Tartines beurrées', 'Œufs durs', 'Lait demi-écrémé', 'Porridge banane', 'Poulet grillé', 'Riz basmati cuit', 'Pâtes cuites', 'Saumon', 'Salade verte vinaigrette', 'Bowl poulet riz légumes', 'Pomme', 'Amandes', 'Fromage blanc', 'Chocolat noir', 'Soupe de légumes', 'Omelette', 'Lentilles cuites', 'Légumes vapeur', 'Barre de céréales', 'Jus d''orange', 'Chips');

insert into public.items (user_id, name, kind, emoji, description, recipe, ingredients, portion, kcal, protein, carbs, fat, meals)
select u.id, v.*
from (select id from auth.users order by created_at limit 1) u,  -- shortcut: un seul compte sur ce projet
(values
  ('Bol fromage blanc, fruits rouges, avoine et beurre de cacahuète', 'recipe', '🥣', 'Prêt en 3 minutes, sans cuisson.', 'Passer les fruits rouges 1 min au micro-ondes pour les décongeler (ou les sortir la veille).
Verser le fromage blanc dans un bol, ajouter les flocons d''avoine et mélanger.
Déposer les fruits rouges et leur jus par-dessus.
Finir avec le beurre de cacahuète en filet.', '[{"name":"Fromage blanc 3 %","qty":"250 g"},{"name":"Fruits rouges surgelés","qty":"100 g"},{"name":"Flocons d''avoine","qty":"40 g"},{"name":"Beurre de cacahuète","qty":"20 g"}]'::jsonb, '1 grand bol', 500, 29, 45, 21, array['breakfast', 'snack']::text[]),
  ('Omelette 3 œufs au cheddar et pain complet grillé', 'recipe', '🍳', null, 'Battre les œufs avec le sel et le poivre.
Faire chauffer l''huile ou le beurre à feu moyen et verser les œufs.
Quand le dessus est presque pris, parsemer le cheddar au milieu et plier l''omelette.
Griller le pain et servir à côté.', '[{"name":"Œufs","qty":"3"},{"name":"Pain de mie complet","qty":"2 tranches (70 g)"},{"name":"Cheddar râpé","qty":"20 g"},{"name":"Huile ou beurre","qty":"1 c.c."},{"name":"Sel, poivre","qty":""}]'::jsonb, '1 assiette', 536, 32, 31, 30, array['breakfast']::text[]),
  ('Overnight oats aux fruits rouges et beurre de cacahuète', 'recipe', '🫙', 'À préparer la veille au soir.', 'Le soir, mettre tous les ingrédients dans un bocal ou un bol fermé et bien mélanger.
Laisser toute la nuit au frigo.
Le matin, c''est prêt : les fruits ont décongelé, il suffit de mélanger.', '[{"name":"Flocons d''avoine","qty":"70 g"},{"name":"Lait entier","qty":"200 ml"},{"name":"Fromage blanc","qty":"100 g"},{"name":"Fruits rouges surgelés","qty":"80 g"},{"name":"Beurre de cacahuète","qty":"15 g"},{"name":"Miel","qty":"1 c.c. (10 g)"}]'::jsonb, '1 bocal', 620, 27, 72, 23, array['breakfast']::text[]),
  ('Hachis parmentier à la patate douce', 'recipe', '🥘', 'Lot de 3 portions, se garde 3 jours au frigo.', 'Cuire la patate douce en cubes 15 à 20 min dans l''eau salée, puis l''écraser avec le beurre et le lait.
Faire revenir l''oignon, ajouter le bœuf et l''émietter.
Ajouter le concentré de tomate, l''ail, le paprika, le sel et le poivre.
Dans un plat : la viande en bas, la purée dessus, puis la mozzarella.
Enfourner 20 min à 200 °C.', '[{"name":"Patate douce épluchée","qty":"1 kg (≈ 1,2 kg brute)"},{"name":"Bœuf haché 5 %","qty":"600 g"},{"name":"Oignon","qty":"1 (100 g)"},{"name":"Concentré de tomate","qty":"1 c.s. (20 g)"},{"name":"Lait","qty":"100 ml"},{"name":"Beurre","qty":"20 g"},{"name":"Mozzarella râpée","qty":"90 g"},{"name":"Ail, paprika, sel, poivre","qty":""}]'::jsonb, '1 portion (lot de 3)', 704, 56, 73, 23, array['lunch', 'dinner']::text[]),
  ('Tacos de poulet croustillants, sauce crémeuse et salsa', 'recipe', '🌮', 'Astuce : cuire tout le poulet du lot d’un coup, il se garde 3 jours.', 'Mariner le poulet 15 min avec les épices, le citron vert et 1 c.c. d''huile.
Le cuire 8 à 10 min à la poêle.
Poser une tortilla dans la poêle huilée, mozzarella et poulet sur une moitié, plier et dorer des deux côtés.
Mélanger la sauce et couper la salsa, servir avec les tacos.', '[{"name":"Blanc de poulet en petits cubes","qty":"180 g"},{"name":"Grandes tortillas","qty":"2 (120 g)"},{"name":"Mozzarella","qty":"40 g"},{"name":"Huile","qty":"2 c.c."},{"name":"Paprika fumé, cumin, ail en poudre, citron vert, sel","qty":""},{"name":"Sauce","qty":"30 g de fromage blanc + 15 g de mayo + sauce piquante"},{"name":"Salsa","qty":"1 tomate + ¼ d''oignon rouge + citron vert"}]'::jsonb, '2 tacos', 934, 64, 70, 43, array['lunch', 'dinner']::text[]),
  ('Burger de poulet croustillant au miel piquant', 'recipe', '🍔', '2 burgers font un gros repas.', 'Paner le poulet : farine, puis œuf battu (sel, paprika, ail), puis chapelure.
Le cuire dans un fond d''huile 4 à 5 min par face (ou 18 min au four à 200 °C).
Le badigeonner de miel et de sauce piquante, poser le cheddar pour qu''il fonde.
Monter le burger : pain, sauce mayo-fromage blanc, salade, tomate, poulet.', '[{"name":"Pain burger","qty":"1"},{"name":"Blanc de poulet aplati","qty":"120 g"},{"name":"Œuf","qty":"½"},{"name":"Chapelure panko","qty":"20 g"},{"name":"Farine","qty":"8 g"},{"name":"Huile","qty":"1 c.c."},{"name":"Cheddar","qty":"20 g"},{"name":"Mayo","qty":"10 g + fromage blanc : 10 g"},{"name":"Miel","qty":"1 c.c. + sauce piquante"},{"name":"Tomate, salade","qty":""}]'::jsonb, '1 burger', 713, 47, 64, 29, array['lunch', 'dinner']::text[]),
  ('Burger de bœuf au cheddar fondu', 'recipe', '🍔', null, 'Toaster le pain coupé en deux à la poêle, face coupée contre le fond.
Saler le steak et le cuire 3 min par face à feu vif.
Poser le cheddar dessus la dernière minute, couvrir pour qu''il fonde.
Tartiner le pain de mayo et de ketchup, puis salade, tomate, oignon et steak.', '[{"name":"Pain burger","qty":"1"},{"name":"Steak haché 15 %","qty":"125 g"},{"name":"Cheddar","qty":"20 g"},{"name":"Mayo","qty":"10 g"},{"name":"Ketchup","qty":"15 g"},{"name":"Tomate, salade, oignon","qty":""}]'::jsonb, '1 burger', 666, 35, 43, 38, array['lunch', 'dinner']::text[]),
  ('Penne crème-fromage et tenders de poulet', 'recipe', '🍝', null, 'Cuire les tenders au four ou à l''air fryer selon le paquet.
Cuire les penne al dente.
Pendant ce temps, chauffer la crème, le lait et l''ail, puis faire fondre les fromages à feu doux.
Mélanger les pâtes à la sauce et poser les tenders coupés par-dessus.', '[{"name":"Penne (sec)","qty":"110 g"},{"name":"Crème légère 15 %","qty":"80 g"},{"name":"Lait","qty":"50 ml"},{"name":"Mozzarella","qty":"25 g"},{"name":"Cheddar","qty":"25 g"},{"name":"Tenders surgelés","qty":"120 g (≈ 4)"},{"name":"Ail, poivre","qty":""}]'::jsonb, '1 assiette', 988, 47, 103, 42, array['lunch', 'dinner']::text[]),
  ('Coquillettes au poulet, crème et fromage', 'recipe', '🍲', null, 'Cuire les coquillettes dans l''eau salée.
Dorer le poulet dans l''huile avec le paprika et l''ail.
Ajouter la crème et les fromages, laisser fondre 2 min à feu doux.
Mélanger avec les coquillettes égouttées.', '[{"name":"Coquillettes (sec)","qty":"130 g"},{"name":"Blanc de poulet en dés","qty":"150 g"},{"name":"Crème 15 %","qty":"60 g"},{"name":"Mozzarella","qty":"20 g"},{"name":"Cheddar","qty":"20 g"},{"name":"Huile","qty":"1 c.c."},{"name":"Paprika, ail","qty":""}]'::jsonb, '1 assiette', 904, 62, 96, 29, array['lunch', 'dinner']::text[]),
  ('Pâtes à la bolognaise de bœuf', 'recipe', '🍝', null, 'Faire revenir l''oignon dans l''huile, puis ajouter le bœuf et l''émietter.
Verser la passata avec l''ail et les herbes, laisser mijoter 10 min à feu doux.
Cuire les pâtes pendant ce temps.
Servir la sauce sur les pâtes avec le cheddar.', '[{"name":"Pâtes (sec)","qty":"130 g"},{"name":"Bœuf haché 5 %","qty":"150 g"},{"name":"Passata","qty":"150 g"},{"name":"Oignon","qty":"½"},{"name":"Cheddar","qty":"20 g"},{"name":"Huile","qty":"1 c.c."},{"name":"Ail, herbes de Provence","qty":""}]'::jsonb, '1 assiette', 846, 56, 107, 21, array['lunch', 'dinner']::text[]),
  ('Poulet à la crème moutarde, riz et lentilles corail', 'recipe', '🍛', 'Le riz et les lentilles cuisent ensemble dans la même casserole.', 'Cuire le riz et les lentilles corail ensemble, environ 15 min dans 2,5 volumes d''eau.
Dorer le poulet en dés avec l''oignon dans l''huile.
Ajouter la crème et la moutarde, laisser 5 min à feu doux.
Servir sur le riz et les lentilles.', '[{"name":"Blanc de poulet","qty":"170 g"},{"name":"Riz (sec)","qty":"80 g"},{"name":"Lentilles corail (sec)","qty":"40 g"},{"name":"Crème 15 %","qty":"60 g"},{"name":"Oignon","qty":"½"},{"name":"Moutarde","qty":"1 c.c."},{"name":"Huile","qty":"1 c.c."}]'::jsonb, '1 assiette', 768, 57, 90, 18, array['lunch', 'dinner']::text[]),
  ('Gainer maison banane, avoine et fruits rouges', 'recipe', '🥤', 'Créatine : 3 à 5 g tous les jours, à boire dans la foulée.', 'Mettre tous les ingrédients dans le blender, la banane coupée en morceaux.
Mixer 30 à 45 secondes jusqu''à ce que ce soit bien lisse.
Ajouter la créatine, mixer encore 5 secondes et boire tout de suite.', '[{"name":"Lait entier","qty":"400 ml"},{"name":"Flocons d''avoine","qty":"60 g"},{"name":"Banane","qty":"1"},{"name":"Beurre de cacahuète","qty":"30 g"},{"name":"Fruits rouges surgelés","qty":"80 g"},{"name":"Miel","qty":"1 c.s. (15 g)"},{"name":"Créatine","qty":"3 à 5 g"}]'::jsonb, '1 grand shaker', 850, 30, 102, 34, array['snack']::text[]),
  ('Gainer maison à la whey', 'recipe', '🥤', 'La même recette avec 30 g de whey en plus.', 'Mettre tous les ingrédients sauf la whey dans le blender, la banane coupée en morceaux.
Mixer 30 à 45 secondes jusqu''à ce que ce soit bien lisse.
Ajouter la whey et la créatine, mixer encore 5 à 10 secondes et boire tout de suite.', '[{"name":"Lait entier","qty":"400 ml"},{"name":"Flocons d''avoine","qty":"60 g"},{"name":"Banane","qty":"1"},{"name":"Beurre de cacahuète","qty":"30 g"},{"name":"Fruits rouges surgelés","qty":"80 g"},{"name":"Miel","qty":"1 c.s. (15 g)"},{"name":"Whey","qty":"30 g"},{"name":"Créatine","qty":"3 à 5 g"}]'::jsonb, '1 grand shaker', 964, 53, 104, 35, array['snack']::text[])
) as v(name, kind, emoji, description, recipe, ingredients, portion, kcal, protein, carbs, fat, meals)
where not exists (select 1 from public.items i where i.name = v.name);

commit;
