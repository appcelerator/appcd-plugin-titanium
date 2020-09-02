/**
 * This code is based on https://github.com/jeffbonnes/appc-app-preview-cli-hook by Jeff Bonnes and
 * licensed under the MIT license.
 *
 * Installr API docs: https://help.installrapp.com/api/
 */

import fs from 'fs';
import got from 'got';
import path from 'path';
import tunnel from '../tunnel';
import { expandPath } from 'appcd-path';

const endpoint = 'https://appbeta.axway.com';

exports.init = (logger, config, cli, appc) => {
	cli.on('build.config', data => {
		data.result[1].appPreview = [
			'App Preview Options',
			{
				'--app-preview':              'Deploy a build to App Preview',
				'--add [teams]':              'A comma-separated list of team names to add access to the App Preview build',
				'--release-notes [text]':     'Release notes for the App Preview build',
				'--invite [email_addresses]': 'A comma-separated list of email addresses to send the App Preview invites to',
				'--notify [teams]':           'A comma-separated list of team names that have been previously invited to notify of App Preview build'
			}
		];
	});

	cli.on('build.pre.compile', async data => {
		//
	});

	cli.on('build.finalize', async data => {
		//
	});
};

/*
var logger, platform, config, appc, appcConfig, j, build_file, busy;

j = request.jar();

exports.init = function(_logger, _config, cli, _appc) {
	if (process.argv.indexOf('--app-preview') !== -1) {
		cli.addHook('build.pre.compile', configure);
		cli.addHook('build.finalize', upload2AppPreview);
	}
	logger = _logger;
	appcConfig = _config;
	appc = _appc;
};

function configure(data, finished) {
	config = {};
	config.releaseNotes = data.cli.argv['release-notes'];
	config.add = data.cli.argv['add'];
	config.notify = data.cli.argv['notify'];
	config.emails = data.cli.argv['invite'];

	if (!config.releaseNotes || !config.notify) {
		doPrompt(finished);
	} else {
		finished();
	}
}

function doPrompt(finishedFunction) {
	var f = {};

	if (config.releaseNotes === undefined) {
		f.releaseNotes = fields.text({
			title: "Release Notes",
			desc: "Enter release notes.",
			validate: function(value, callback) {
				callback(!value.length, value);
			}
		})
	}
	if (config.notify === undefined) {
		f.notify = fields.select({
			title: "Notify",
			desc: "Notify previous testers on upload.",
			promptLabel: "(y,n)",
			options: ['__y__es', '__n__o']
		});
	}

	var prompt = fields.set(f);

	prompt.prompt(function(err, result) {
		_.each(_.keys(result), function(key) {
			config[key] = result[key];
		});
		finishedFunction();
	});
}

var onUploadComplete = function(err, httpResponse, body) {
	var resp = {};
	if (err) {
		logger.error(err);
	} else {
		if (httpResponse.statusCode != 200) {
			logger.error('Error uploading to app preview, status code=' + httpResponse.statusCode);
			return;
		} else {
			resp = JSON.parse(body);
			if (resp.result != "success") {
				logger.error(resp.message);
				return;
			}
		}
		logger.info("App uploaded successfully.");
		resp = JSON.parse(body);
		// check if we want to invite new testers
		if (config.emails) {
			logger.info('Adding tester(s) ' + config.emails + ' to latest build');
			var r = request.post({
				jar: j,
				url: SERVER + '/apps/' + resp.appData.id + '/builds/' + resp.appData.latestBuild.id + '/team.json'
			}, function optionalCallback(err, httpResponse, body) {
				if (err) {
					logger.error(err);
					showFinalUrl(resp);
				} else {
					logger.info("Tester(s) invited successfully.");
					showFinalUrl(resp);
				}
			});
			var form = r.form();
			form.append('emails', config.emails);
		} else {
			showFinalUrl(resp);
		}
	}
}

function showFinalUrl(resp) {
	logger.info('Open ' + SERVER + '/dashboard/index#/apps/' + resp.appData.id + ' to configure your app in App Preview.')
}

function upload2AppPreview(data, finished) {
	validate(data);
	var sid = process.env.APPC_SESSION_SID;
	logger.info('Uploading app to App Preview...please wait...');
	var cookie = request.cookie('connect.sid=' + sid);
	j.setCookie(cookie, SERVER);

	var obj = {
		url: SERVER + '/apps.json',
		jar: j,
		headers: {
			"user-agent": 'Appcelerator CLI'
		}
	};

	// configure proxy
	if (process.env.APPC_CONFIG_PROXY) {
		obj.proxy = process.env.APPC_CONFIG_PROXY;
	}

	var r = request.post(obj, onUploadComplete);

	var form = r.form();
	var file = fs.createReadStream(build_file);
	var totalSize = fs.statSync(build_file).size;
	var bytesRead = 0;
	var lastPercent = 0;
	file.on('data', function(chunk) {
		bytesRead += chunk.length;
		var currentPercent = Math.round((bytesRead / totalSize) * 100);
		if (currentPercent != lastPercent && currentPercent % 5 == 0) {
			logger.info("uploaded " + currentPercent + "%");
			lastPercent = currentPercent;
		}
	});
	form.append('qqfile', file);
	form.append('releaseNotes', config.releaseNotes);
	form.append('notify', config.notify.toString());
	if (config.add) {
		form.append('add', config.add.toString());
	}
}

function validate(data) {

	platform = data.cli.argv.platform;

	if (['android', 'ios'].indexOf(platform) === -1) {
		logger.error("Only android and ios support with --app-preview flag");
		return;
	}

	if (data.cli.argv.platform === "android") {
		build_file = data.apkFile
	} else {
		if (data.buildManifest.outputDir === undefined && data.iosBuildDir === undefined) {
			logger.error("Output directory must be defined to use --app-preview flag");
			return;
		}
		build_file = afs.resolvePath(path.join(data.buildManifest.outputDir, data.buildManifest.name + ".ipa"));
	}

}
*/
