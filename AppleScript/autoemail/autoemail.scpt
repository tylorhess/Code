FasdUAS 1.101.10   ��   ��    k             l      ��  ��    G Atell application "Finder"	display dialog "Hello World"end tell     � 	 	 � t e l l   a p p l i c a t i o n   " F i n d e r "  	 d i s p l a y   d i a l o g   " H e l l o   W o r l d "  e n d   t e l l    
  
 l     ��������  ��  ��        l     ����  O        r        n        1   	 ��
�� 
DPVu  n    	    1    	��
�� 
1756  1    ��
�� 
1107  o      ���� 0 thedata theData  m       
                                                                                  XCEL  alis    �  Macintosh HD               �P[�H+    �XMicrosoft Excel.app                                              �9���"        ����  	                Microsoft Office 2011     �P�      ��r      �X     EMacintosh HD:Applications: Microsoft Office 2011: Microsoft Excel.app   (  M i c r o s o f t   E x c e l . a p p    M a c i n t o s h   H D  6Applications/Microsoft Office 2011/Microsoft Excel.app  / ��  ��  ��        l     ��������  ��  ��        l    ����  r        m    ��
�� boovtrue  o      ���� 0 firstrow firstRow��  ��         l  9 !���� ! X   9 "�� # " Z   #4 $ %�� & $ o   # $���� 0 firstrow firstRow % r   ' * ' ( ' m   ' (��
�� boovfals ( o      ���� 0 firstrow firstRow��   & k   -4 ) )  * + * r   - � , - , o   - .���� 0 arow aRow - J       . .  / 0 / o      ���� 0 rowfromname rowFromName 0  1 2 1 o      ���� 0 rowfromemail rowFromEmail 2  3 4 3 o      ����  0 rowreplytoname rowReplyToName 4  5 6 5 o      ���� "0 rowreplytoemail rowReplyToEmail 6  7 8 7 o      ���� 0 	rowtoname 	rowToName 8  9 : 9 o      ���� 0 
rowtoemail 
rowToEmail :  ; < ; o      ���� 0 
rowsubject 
rowSubject <  = > = o      ���� 0 rowgreeting rowGreeting >  ? @ ? o      ���� 0 rowbody rowBody @  A�� A o      ���� 0 rowsalutation rowSalutation��   +  B C B r   � � D E D b   � � F G F b   � � H I H b   � � J K J o   � ����� 0 rowfromname rowFromName K m   � � L L � M M    < I o   � ����� 0 rowfromemail rowFromEmail G m   � � N N � O O  > E o      ���� 0 rowfrom rowFrom C  P Q P r   � � R S R b   � � T U T b   � � V W V b   � � X Y X o   � �����  0 rowreplytoname rowReplyToName Y m   � � Z Z � [ [    < W o   � ����� "0 rowreplytoemail rowReplyToEmail U m   � � \ \ � ] ]  > S o      ���� 0 
rowreplyto 
rowReplyTo Q  ^ _ ^ r   � � ` a ` b   � � b c b b   � � d e d b   � � f g f b   � � h i h b   � � j k j b   � � l m l o   � ����� 0 rowgreeting rowGreeting m o   � ���
�� 
ret  k o   � ���
�� 
ret  i o   � ����� 0 rowbody rowBody g o   � ���
�� 
ret  e o   � ���
�� 
ret  c o   � ����� 0 rowsalutation rowSalutation a o      ���� 0 
rowcontent 
rowContent _  n o n l  � ���������  ��  ��   o  p�� p O   �4 q r q k   �3 s s  t u t r   �  v w v I  � ����� x
�� .corecrel****      � null��   x �� y z
�� 
kocl y m   � ���
�� 
bcke z �� {��
�� 
prdt { K   � � | | �� } ~
�� 
sndr } o   � ����� 0 rowfrom rowFrom ~ ��  �
�� 
rpto  o   � ����� 0 
rowreplyto 
rowReplyTo � �� � �
�� 
subj � o   � ����� 0 
rowsubject 
rowSubject � �� � �
�� 
ctnt � o   � ����� 0 
rowcontent 
rowContent � �� ���
�� 
pvis � m   � ���
�� boovtrue��  ��   w o      ���� 0 
newmessage 
newMessage u  � � � O  + � � � I *���� �
�� .corecrel****      � null��   � �� � �
�� 
kocl � m  	��
�� 
trcp � �� � �
�� 
insh � n   � � �  ;   � 2 ��
�� 
trcp � �� ���
�� 
prdt � K  $ � � �� � �
�� 
pnam � o  ���� 0 	rowtoname 	rowToName � �� ���
�� 
radd � o  "���� 0 
rowtoemail 
rowToEmail��  ��   � o  ���� 0 
newmessage 
newMessage �  ��� � I ,3�� ���
�� .emsgsendnull���     bcke � o  ,/���� 0 
newmessage 
newMessage��  ��   r m   � � � ��                                                                                  emal  alis    F  Macintosh HD               �P[�H+     Mail.app                                                         q��PJ�        ����  	                Applications    �P�      �P�         #Macintosh HD:Applications: Mail.app     M a i l . a p p    M a c i n t o s h   H D  Applications/Mail.app   / ��  ��  �� 0 arow aRow # o    ���� 0 thedata theData��  ��      � � � l     ��������  ��  ��   �  � � � l      �� � ���   � � �
property theSignature : "mySignature"tell application "Mail"	try		set mySignature to signature theSignature	on error		set mySignature to missing value	end tryend tell
    � � � �^ 
 p r o p e r t y   t h e S i g n a t u r e   :   " m y S i g n a t u r e "  t e l l   a p p l i c a t i o n   " M a i l "  	 t r y  	 	 s e t   m y S i g n a t u r e   t o   s i g n a t u r e   t h e S i g n a t u r e  	 o n   e r r o r  	 	 s e t   m y S i g n a t u r e   t o   m i s s i n g   v a l u e  	 e n d   t r y  e n d   t e l l 
 �  � � � l     ��������  ��  ��   �  ��� � l      �� � ���   ��{
set theMessage to make new outgoing message with properties 
	{
		visible:true, 
		subject:"REMOVE: RE:" & theSelectedMessageSubject, 
		content:MessageText & theSelectedMessageContent, 
		reply to:theSelectedMessageRecipient
	}
	make new to recipient at end of to recipients with properties {name:theSelectedMessageSenderName, address:theSelectedMessageSenderAddress}
end tell
    � � � �� 
 s e t   t h e M e s s a g e   t o   m a k e   n e w   o u t g o i n g   m e s s a g e   w i t h   p r o p e r t i e s   
 	 { 
 	 	 v i s i b l e : t r u e ,   
 	 	 s u b j e c t : " R E M O V E :   R E : "   &   t h e S e l e c t e d M e s s a g e S u b j e c t ,   
 	 	 c o n t e n t : M e s s a g e T e x t   &   t h e S e l e c t e d M e s s a g e C o n t e n t ,   
 	 	 r e p l y   t o : t h e S e l e c t e d M e s s a g e R e c i p i e n t 
 	 } 
 	 m a k e   n e w   t o   r e c i p i e n t   a t   e n d   o f   t o   r e c i p i e n t s   w i t h   p r o p e r t i e s   { n a m e : t h e S e l e c t e d M e s s a g e S e n d e r N a m e ,   a d d r e s s : t h e S e l e c t e d M e s s a g e S e n d e r A d d r e s s } 
 e n d   t e l l 
��       �� � ���   � ��
�� .aevtoappnull  �   � **** � �� ����� � ���
�� .aevtoappnull  �   � **** � k    9 � �   � �   � �  ����  ��  ��   � ���� 0 arow aRow � 1 ����������������������������������������~�}�|�{�z L N�y Z \�x�w�v ��u�t�s�r�q�p�o�n�m�l�k�j�i�h
�� 
1107
�� 
1756
�� 
DPVu�� 0 thedata theData�� 0 firstrow firstRow
�� 
kocl
�� 
cobj
�� .corecnte****       ****�� 0 rowfromname rowFromName�� 0 rowfromemail rowFromEmail��  0 rowreplytoname rowReplyToName�� �� "0 rowreplytoemail rowReplyToEmail�� �� 0 	rowtoname 	rowToName�� �� 0 
rowtoemail 
rowToEmail�� �� 0 
rowsubject 
rowSubject� �~ 0 rowgreeting rowGreeting�} 	�| 0 rowbody rowBody�{ 
�z 0 rowsalutation rowSalutation�y 0 rowfrom rowFrom�x 0 
rowreplyto 
rowReplyTo
�w 
ret �v 0 
rowcontent 
rowContent
�u 
bcke
�t 
prdt
�s 
sndr
�r 
rpto
�q 
subj
�p 
ctnt
�o 
pvis
�n .corecrel****      � null�m 0 
newmessage 
newMessage
�l 
trcp
�k 
insh
�j 
pnam
�i 
radd
�h .emsgsendnull���     bcke��:� *�,�,�,E�UOeE�O%�[��l kh  � fE�Y	�E[�k/E�Z[�l/E�Z[�m/E�Z[��/E�Z[��/E�Z[�a /E` Z[�a /E` Z[�a /E` Z[�a /E` Z[�a /E` ZO�a %�%a %E` O�a %�%a %E` O_ _  %_  %_ %_  %_  %_ %E` !Oa " e*�a #a $a %_ a &_ a '_ a (_ !a )ea � *E` +O_ + %*�a ,a -*a ,-6a $a .�a /_ �a  *UO_ +j 0U[OY��ascr  ��ޭ