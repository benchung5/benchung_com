---
layout: post
title: WordPress LAMP setup on Digital Ocean
date: 2016-08-30 01:52
author: Ben Chung
comments: true
category: digital-ocean
category_name: Digital Ocean
thumbnail: wordpress-lamp-digital-ocean.jpg
---
This is based on <a href="https://www.digitalocean.com/community/tutorials/how-to-migrate-wordpress-from-shared-hosting-to-a-cloud-server-with-zero-downtime">this article from Digital Ocean</a> but modified to include, and addresses some .htaccess, directory structure issues as well as add support for FTP and phpMyAdmin. We also presume you have an existing domain registered somewhere that you want to point to your digital ocean server and you have an existing WordPress site you want to migrate.

Summary of steps:

<ul>
<li>Initial server setup</li>
<li>LAMP stack setup</li>
<li>Install phpMyAdmin</li>
<li>Set Up Local Hosts File for testing domain (windows)</li>
<li>Create virtual host</li>
<li>Configure files/permissions</li>
<li>Install vsftp</li>
<li>Update Wordpress wp-config and database</li>
<li>Point host record</li>
</ul>

<h2>Initial server setup</h2>

Create a droplet, select Ubuntu 14.04.5 x32 512mb. We don't need x64 as they've stated: 
"A 32-bit operating system is recommended for cloud servers with less than 3 GB of RAM".
If you wish to use ssh keys, do the below step, if not just ignore it.

We can use these as placeholder settings:

<ul>
<li>IP Address: <-serveripaddress-></li>
<li>Username: <-newusername-></li>
<li>Password: <-userpassword-></li>
<li>Existing Domain: <-domainname-></li>
<li>Existing wp database: <-wpdatabase-></li>
<li>Existing wp database user: <-wpdbusere-></li>
<li>MySQL Root Password: <-mysqlpass-></li>
<li>phpMyAdmin Password: <-phpmyadminpass-></li>
</ul>

<h3>Generate ssh key (optional)</h3>

Using command prompt as admin:

<pre><code class="bash">cd ~/.ssh
</code></pre>

You might need to make the .ssh directory in your user directory if none exists then generate the keys:

<pre><code class="bash">ssh-keygen -C "&lt;-domainname-&gt;"
</code></pre>

Hit enter a few times to genenraterate key then copy the entire contents of id_rsa.pub to clipboard and past in the new
ssh key box when creating a the droplet.

<h3>Locally Connect and add a user</h3>

<pre><code class="bash">ssh root@&lt;-serveripaddress-&gt;
</code></pre>

Create new user:

<pre><code class="bash">adduser &lt;-newusername-&gt;
</code></pre>

Enter a password and hit enter a few times. Add the user to the sudo group:

<pre><code class="bash">gpasswd -a &lt;-newusername-&gt; sudo
</code></pre>

Disable remote login to the root account from this user (for security)

<pre><code class="bash">nano /etc/ssh/sshd_config
</code></pre>

change this:

<pre><code class="bash">PermitRootLogin yes
</code></pre>

to this:

<pre><code class="bash">PermitRootLogin no
</code></pre>

To save hit CTRL-X, then Y, then ENTER. Restart ssh

<pre><code class="bash">service ssh restart
</code></pre>

Test the connection in a new terminal window

<pre><code class="bash">ssh benc@&lt;-serveripaddress-&gt;
</code></pre>

To run commands from now on you use: sudo command_to_run

<h2>LAMP stack setup</h2>

Update links:

<pre><code class="bash">sudo apt-get update
</code></pre>

<h3>Install apache:</h3>

<pre><code class="bash">sudo apt-get install apache2
</code></pre>

Test by putting <-serveripaddress-> in the browser.

<h3>Install MySQL</h3>

<pre><code class="bash">sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql
</code></pre>

Enter your desired MySQL root user passoword then activate MySQL:

<pre><code class="bash">sudo mysql_install_db
</code></pre>

Run the secure installation setup script:

<pre><code class="bash">sudo /usr/bin/mysql_secure_installation
</code></pre>

Enter your newly created password:

<pre><code class="bash">&lt;-mysqlpass-&gt;
</code></pre>

Type no then yes to the rest of the settings.

<h3>Install PHP</h3>

<pre><code class="bash">sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt
</code></pre>

Add php to the directory index, to serve the relevant php index files:

<pre><code class="bash">sudo nano /etc/apache2/mods-enabled/dir.conf
</code></pre>

Add index.php to the beginning of index files. The page should now look like this:

<pre><code class="apache">&lt;IfModule mod_dir.c&gt;
          DirectoryIndex index.php index.html index.cgi index.pl index.php index.xhtml index.htm
&lt;/IfModule&gt;
</code></pre>

Install recommended modules for wordpress:

<pre><code class="bash">sudo apt-get install php5-fpm php5-mysqlnd php5-imagick php5-curl
</code></pre>

If more are desired you can list available modules:

<pre><code class="bash">apt-cache search php5-
</code></pre>

<h3>preveiw our stack through a php page</h3>

Create a new file:

<pre><code class="bash">sudo nano /var/www/html/info.php
</code></pre>

Add:

<pre><code class="bash">&lt;?php phpinfo(); ?&gt;
</code></pre>

Save it and restart apache:

<pre><code class="bash">sudo service apache2 restart
</code></pre>

Test in browser:

<pre><code class="bash">http://&lt;-serveripaddress-&gt;/info.php
</code></pre>

<h3>install phpMyAdmin</h3>

<pre><code class="bash">sudo apt-get install phpmyadmin
</code></pre>

Important -> When the first prompt appears, apache2 is highlighted, but not selected. If you do not hit "SPACE" to select Apache, the installer will not move the necessary files during installation. Hit "SPACE", "TAB", and then "ENTER" to select Apache. Choose yes to all. Enter a phpmyadmin pass just for phpMyAdmin to use.

<pre><code class="bash">&lt;-phpmyadminpass-&gt;
</code></pre>

Enable this extension:

<pre><code class="bash">sudo php5enmod mcrypt
</code></pre>

Restart apache:

<pre><code class="bash">sudo service apache2 restart
</code></pre>

To test access:

<pre><code class="bash">http://&lt;-serveripaddress-&gt;/phpmyadmin
</code></pre>

<h2>Set Up Local Hosts File</h2>

This is for testing the domain from your local machine before you point it to your new setup.
Once your setup is all done, we'll remove this. Note that this is on Windows, but Mac/linux I hear is just as easy.

<h3>Altering the hosts file</h3>

Make a copy of the hosts file, so that you can restore it later if you want to:

<pre><code class="bhash">copy C:\Windows\System32\drivers\etc\hosts C:\Windows\Temp
</code></pre>

Open the hosts file in Notepad so you can edit it:

<pre><code class="bash">notepad C:\Windows\System32\drivers\etc\hosts
</code></pre>

Put this in and save it:

<pre><code class="bash">&lt;-serveripaddress-&gt; &lt;-domainname-&gt; #testing &lt;-domainname-&gt; locally
</code></pre>

<h2>Create Virtual Host</h2>

Back in your server shell, add a virtual host file in sites available dir:

<pre><code class="bash">sudo nano /etc/apache2/sites-available/&lt;-domainname-&gt;.conf
</code></pre>

Add this to the file:

<pre><code class="apache">&lt;VirtualHost *:80&gt;

    ServerAdmin &lt;-youremailaddress-&gt;
    ServerName &lt;-domainname-&gt;
    ServerAlias www.&lt;-domainname-&gt;
    DocumentRoot /var/www/&lt;-domainname-&gt;/public_html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    &lt;Directory /var/www/&lt;-domainname-&gt;/public_html&gt;
        Options -Indexes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    &lt;/Directory&gt;

&lt;/VirtualHost&gt;
</code></pre>

Note:

<pre><code class="bash">Options -Indexes +FollowSymLinks +MultiViews
</code></pre>

Prevents the browser from seeing/navigating your site file structure, and:

<pre><code class="bash">AllowOverride All
</code></pre>

allows .htaccess files to work in your virtual host (And sub-directories). Next we enable the virtual host by telling apache to listen on that domain (Apache utility - a2ensite):

<pre><code class="bash">sudo a2ensite benchung.com
</code></pre>

Configure mod rewrite:

<pre><code class="bash">sudo a2enmod rewrite
</code></pre>

Restart apache:

<pre><code class="bash">sudo service apache2 restart
</code></pre>

<h2>Configure files/permissions</h2>

Make site dir:

<pre><code class="bash">sudo mkdir -p /var/www/&lt;-domainname-&gt;/public_html
</code></pre>

Add symlink to user's home folder to get to the web folder:

<pre><code class="bash">sudo ln -s /var/www/benchung.com/public_html  /home/benc/benchung.com
</code></pre>

Change permissions in the site files dir:

<pre><code class="bash">sudo chown &lt;-newusername-&gt;:www-data /var/www/&lt;-domainname-&gt;/public_html
</code></pre>

<h2>Install bindfs for ease of permission issues:</h2>

<pre><code class="bash">sudo apt-get -y install bindfs
</code></pre>

Create the mount point to mirror in the same location so user www-data and benc  will both see itself as the owner of the files
this way WordPress can write to it as well as the user (using FTP) without conflicts. (create-with-perms=0644:a+X) will set files to 644, and folders to 755 when they get created. (force-group) makes the group www-data no matter what:

<pre><code class="bash">sudo bindfs -o perms=0644:a+X,mirror=&lt;-newusername-&gt;:www-data,force-group=www-data /var/www/&lt;-domainname-&gt;/public_html /var/www/&lt;-domainname-&gt;/public_html
</code></pre>

To remove mount if made a mistake:

<pre><code class="bash">sudo umount /home/&lt;-newusername-&gt;/sites/&lt;-domainname-&gt;
</code></pre>

Create test page:

<pre><code class="bash">sudo nano /var/www/benchung.com/public_html/index.html
</code></pre>

Paste in:

<pre><code class="html">&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Welcome to Example.com!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Success!  The example.com virtual host is working!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h2>Install vsftp</h2>

<pre><code class="bash">sudo apt-get install vsftpd
</code></pre>

Open up the configuration file:

<pre><code class="bash">sudo nano /etc/vsftpd.conf
</code></pre>

Change to (don't enable public accesss to files):

<pre><code class="bash">anonymous_enable=NO
</code></pre>

Uncomment these to enable (chroot makes sure all local users are denied access to other server parts):

<pre><code class="apache">local_enable=YES
write_enable=YES
chroot_local_user=YES
allow_writeable_chroot=YES
</code></pre>

To prevent the recent vsftpd upgrade error: "refusing to run with writable root inside chroot". Do this:

<pre><code class="bash">sudo nano /etc/vsftpd.conf
</code></pre>

Add this to the file:

<pre><code class="apache">allow_writeable_chroot=YES
systemctl restart vsftpd
</code></pre>

Restart vsftp:

<pre><code class="bash">sudo service vsftpd restart
</code></pre>

Test connection:

<pre><code class="bash">ftp 159.203.59.15
</code></pre>

<pre><code class="bash">user
</code></pre>

<pre><code class="bash">&lt;-newusername-&gt;
</code></pre>

<pre><code class="bash">&lt;-userpassword-&gt;
</code></pre>

<pre><code class="bash">ls
</code></pre>

Upload your files fia FTP to the html dir. If you need to import an existing WordPress database, put it in th html dir in a folder called DB. If needed, change permissions for all the uploaded files and directories:

<pre><code class="bash">sudo find /var/www/&lt;-domainname-&gt;/public_html -type f -exec chmod 644 {} +
sudo find /var/www/&lt;-domainname-&gt;/public_html -type d -exec chmod 755 {} +
</code></pre>

<h2>Restore the database</h2>

Enter MySQL:

<pre><code class="bash">mysql -u root -p
</code></pre>

Enter your MySQL password then create a user:

<pre><code class="sql">CREATE USER '&lt;-wpdbuser-&gt;'@'&lt;-serveripaddress-&gt;' IDENTIFIED BY '&lt;-wpdbuserpass-&gt;';
</code></pre>

Check:

<pre><code class="sql">SELECT User FROM mysql.user;
</code></pre>

Create database:

<pre><code class="sql">CREATE DATABASE &lt;-wpdatabase-&gt;;
</code></pre>

Select the database:

<pre><code class="sql">USE &lt;-wpdatabase-&gt;;
</code></pre>

Import schema from our uploaded folder:

<pre><code class="bash">SOURCE /var/www/&lt;-domainname-&gt;/public_html/DB/&lt;-wpdatabase-&gt;.sql
</code></pre>

Update the site url if needed. First find the option id for the site url:

<pre><code class="sql">SELECT * FROM wp_options WHERE option_value = 'http://&lt;-yourolddomain-&gt;';
</code></pre>

Find the option_id's (probably 1 &amp; 2), then for each one:

<pre><code class="sql">UPDATE wp_options SET option_value = 'http://&lt;-domainname-&gt;' WHERE option_id = &lt;-theoptionid-&gt;;
</code></pre>

Exit MySQL

<pre><code class="bash">exit
</code></pre>

<h2>Update wp-config</h2>

Change to these settings wp-config.php if needed:

<pre><code>define('DB_NAME', '&lt;-wpdatabase-&gt;');
define('DB_USER', '&lt;-wpdbuser-&gt;');
define('DB_PASSWORD', '&lt;-wpdbuserpass-&gt;');
define('DB_HOST', 'localhost');
</code></pre>

<h2>Last steps</h2>

<h3>Point host record</h3>

Point your 'A' host record to <-serveripaddress-> then set the TTL to 1000 to speed up propogation time (once propogated you can set it back to 14400).

<h3>Restore Hosts File</h3>

You can now restore your hosts file on your local machine by removing the line we added in the "Set Up Local Hosts File" step.
